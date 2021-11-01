/**
 * Injected javascript to the webview.
 * Setting echarts width and height.
 * Support dataZoom/legendselectchanged/click listener.
 */
import worldJson from "./map/worldJson";
import toString from "../../util/toString";

export default function renderChart(props) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : "auto";
  return `
    const eChartsContainer = document.getElementById('main')
    eChartsContainer.style.height = "${height}";
    eChartsContainer.style.width = "${width}";
    eChartsContainer.style.background = "${props.backgroundColor}";
    echarts.registerMap('world', ${JSON.stringify(worldJson)});
    const myChart = echarts.init(eChartsContainer, '${props.themeName}');
    let formatterVariable = ${toString(props.formatterVariable || "")};
    let clickName = {}
    myChart.on('mousedown', (params)=>{
      clickName = {
        name: params.name || '',
        value: params.value || 0
      }
      setTimeout(()=>{ 
        if(clickName.name || clickName.value){
          window.ReactNativeWebView.postMessage(JSON.stringify(clickName));
        }
      }, 100)
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
    var postEvent = params => {
      var seen = [];
      var paramsString = JSON.stringify(params, function(key, val) {
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
    
    //判断是否是iOS
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
       window.addEventListener("message", function(event) {
          if(!event.isTrusted){// 非图表类点击则执行刷新数据操作
            var option = JSON.parse(event.data);
            myChart.setOption(option);
          }
        });
    } else {
      // android监听
      window.document.addEventListener('message', function(event) {
        var option = JSON.parse(event.data);
        myChart.setOption(option);
      });
    }
    myChart.on('mapselectchanged', postEvent);
  `;
}
