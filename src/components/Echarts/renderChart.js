/**
 * Injected javascript to the webview.
 * Setting echarts width and height.
 * Support dataZoom/legendselectchanged/click listener.
 */
import { Platform, Dimensions } from "react-native";
import worldJson from "./map/worldJson";
import toString from "../../util/toString";
const isiOS = Platform.OS === "ios";
const displayScale =
  Dimensions.get("window").scale / Dimensions.get("screen").scale;

export default function renderChart(props) {
  const height = `${(props.height || 400) * displayScale}px`;
  const width = props.width ? `${props.width * displayScale}px` : "auto";
  return `
    const eChartsContainer = document.getElementById('main')
    eChartsContainer.style.height = "${height}";
    eChartsContainer.style.width = "${width}";
    eChartsContainer.style.background = "${props.backgroundColor}";
    echarts.registerMap('world', ${JSON.stringify(
      props.customMapData || worldJson
    )});
    const myChart = echarts.init(eChartsContainer, '${props.themeName}');
    let formatterVariable = ${toString(props.formatterVariable || "")};
    myChart.getZr().on('click', (params)=>{
      let pointInPixel = [params.offsetX, params.offsetY];
      const clickParams={};
      if (myChart.containPixel('grid', pointInPixel)) {
        let pointInGrid = myChart.convertFromPixel({
            seriesIndex: 0
        }, pointInPixel);
        let xIndex = pointInGrid[0]; //索引
        let handleIndex = Number(xIndex);
        // let seriesObj = myChart.getOption(); //图表object对象
        let op = myChart.getOption();
        //获得图表中点击的列
        let month = op.xAxis[0].data[handleIndex];  //获取点击的列名
        const clickParams = {
          value: month || ''
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(clickParams));
      };
    });
    myChart.getZr().on('mousemove', (params)=>{
      let pointInPixel = [params.offsetX, params.offsetY];
      const clickParams={};
      if (myChart.containPixel('grid', pointInPixel)) {
        let pointInGrid = myChart.convertFromPixel({
            seriesIndex: 0
        }, pointInPixel);
        let xIndex = pointInGrid[0]; //索引
        let handleIndex = Number(xIndex);
        let seriesObj = myChart.getOption(); //图表object对象
        let op = myChart.getOption();
        //获得图表中点击的列
        let month = op.xAxis[0].data[handleIndex];  //获取点击的列名
        const clickParams = {
          value: month || ''
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(clickParams));
      };
    });
    myChart.on('dataZoom', (params)=>{
        window.ReactNativeWebView.postMessage(JSON.stringify({type:params.type}));
    });
    myChart.on('legendselectchanged', (params)=>{
        window.ReactNativeWebView.postMessage(JSON.stringify({type: params.type,name:params.name}));
    });
    // tooltip内部事件
    window.tooltipEvent = function (params){
        /**
         * tooltip的formatter可自定义HTML字符串或DOM实例，而当前版本5.2.x只能监听showTip和hideTip事件
         * 本方法为tooltip内部添加事件，可统一调用tooltipEvent函数，如内部有多个事件，可在params里自定义属性加以区分
         * 如<div ontouchstart='tooltipEvent(${JSON.stringify({
           name: "event1",
           value: 1,
         })})'></div>
         * <div ontouchstart='tooltipEvent(${JSON.stringify({
           name: "event2",
           value: 2,
         })})'></div>
        */
        window.ReactNativeWebView.postMessage(JSON.stringify({type:'tooltipEvent',params}));
    }
    let postEvent = params => {
      let seen = [];
      let paramsString = JSON.stringify(params, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
    }
    myChart.setOption(${toString(props.option)});
    // 触发ECharts 中支持的图表行为
    let dispatchAction = (action) => {
      if(Array.isArray(action)){
        action.forEach(i=>{
          myChart.dispatchAction(i)
        })
      }else{
        myChart.dispatchAction(action)
      }
    }
    //判断是否是iOS
    if(${isiOS}){
      window.addEventListener("message", (event) => {
        if (!event.isTrusted) {
          // 非图表类点击则执行刷新数据操作
          let option = JSON.parse(event.data);
          myChart.setOption(option, option.optionSetting);
          // 触发ECharts 中支持的图表行为
          if (option.type === "dispatchAction") {
            dispatchAction(option.action);
          }
          // 获取实例进行操作
          if (option.type === "getInstance") {
            const result = myChart[option.functionName](option.params);
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "getInstance",
                functionName: option.functionName,
                value: result,
              })
            );
          }
        }
      });
    } else {
      // Android Listener
      window.document.addEventListener('message', (event) =>{
        let option = JSON.parse(event.data);
        myChart.setOption(option, option.optionSetting);
        // 触发ECharts 中支持的图表行为
        if(option.type === 'dispatchAction'){
          dispatchAction(option.action)
        }
        // 获取实例进行操作
        if(option.type === 'getInstance'){
          const result = myChart[option.functionName](option.params)
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type:'getInstance',
              functionName:option.functionName,
              value:result
            })
          );
        }
      });
    }
    myChart.on('mapselectchanged', postEvent);
  `;
}
