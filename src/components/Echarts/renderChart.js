/**
 * Injected javascript to the webview.
 * Setting echarts width and height.
 * Support dataZoom/legendselectchanged/click listener.
 */
import { Platform, Dimensions } from "react-native";
import getMapJSON from "./map/worldJson";
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
      props.customMapData || getMapJSON(props?.option?.geo?.length)
    )});
    const myChart = echarts.init(eChartsContainer, '${props.themeName}');
    let formatterVariable = ${toString(props.formatterVariable || "")};
    // Configuration dynamic events.
    for(let temp of ${JSON.stringify(props.eventArrays || "")}){
      myChart.on(temp, (params)=>{
        const clickParams = {
          ...params,
          type: temp
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(clickParams));
      });
    }
    myChart.on('click', (params)=>{
      const clickParams = {
        componentType:params.componentType || "",
        seriesType:params.seriesType || "",
        seriesIndex:params.seriesIndex || 0,
        seriesName:params.seriesName || "",
        dataIndex:params.dataIndex || 0,
        data:params.data || {},
        dataType:params.dataType || "",
        color:params.color || "",
        name: params.name || "",
        value: params.value || 0,
        type: "click"
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(clickParams));
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
  `;
}
