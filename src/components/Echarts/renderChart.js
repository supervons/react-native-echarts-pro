import worldJson from "./map/worldJson";
import toString from "../../util/toString";

export default function renderChart(props) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : "auto";
  return `
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    document.getElementById('main').style.background = "${
      props.backgroundColor
    }";
    echarts.registerMap('world', ${JSON.stringify(worldJson)});
    var myChart = echarts.init(document.getElementById('main'));
    myChart.on('click', (params)=>{
      //window.ReactNativeWebView.postMessage(params.name);
    });
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
      window.ReactNativeWebView.postMessage(JSON.parse(paramsString).name);
      window.postMessage(paramsString);
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
