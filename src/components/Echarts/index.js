/**
 * Use webview and injectedJavaScript to render the echarts container.
 */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Platform, View } from "react-native";
import WebView from "react-native-webview";
import renderChart from "./renderChart";
import HtmlWeb from "../Utils/HtmlWeb";

function Echarts(props, ref) {
  const echartRef = useRef();
  const [extensionScript, setExtensionScript] = useState("");
  const [instanceFlag] = useState(false);
  const [instanceResult, setInstanceResult] = useState({});
  const latestCount = useRef(instanceFlag);
  const latestResult = useRef(instanceResult);
  /**
   * Export methods to parent.
   * Parent can use ref to call the methods.
   */
  useImperativeHandle(ref, () => ({
    setNewOption(option, optionSetting) {
      // See more info: https://echarts.apache.org/en/api.html#echartsInstance.setOption
      option.optionSetting = optionSetting;
      echartRef.current.postMessage(JSON.stringify(option));
    },
    /**
     * 触发ECharts 中支持的图表行为
     * Chart actions supported by ECharts are triggered through dispatchAction.
     * @param {object|array} action
     */
    dispatchAction(action) {
      echartRef.current.postMessage(
        JSON.stringify({ type: "dispatchAction", action })
      );
    },
    /**
     * Get echarts instance support function.
     * @param {string} functionName
     * @param {object} params
     */
    async getInstance(functionName, params) {
      echartRef.current.postMessage(
        JSON.stringify({ type: "getInstance", functionName, params })
      );
      return await new Promise((resolve) => {
        const id = setInterval(() => {
          if (latestCount.current && latestResult.current[functionName]) {
            clearInterval(id);
            resolve(latestResult.current[functionName]);
          }
        }, 50);
      });
    },
  }));

  useEffect(() => {
    echartRef.current.postMessage(JSON.stringify(props.option));
  }, [props.option]);

  /**
   * Capture the echarts event.
   * @param event echarts event in webview.
   */
  function onMessage(event) {
    const echartsData = JSON.parse(event.nativeEvent.data);
    // 判断监听类型
    if (echartsData.type === "datazoom") {
      props.onDataZoom?.();
    } else if (echartsData.type === "legendselectchanged") {
      props.legendSelectChanged?.(echartsData.name);
    } else if (echartsData.type === "tooltipEvent") {
      props.tooltipEvent?.(echartsData.params);
    } else if (echartsData.type === "getInstance") {
      const result = JSON.parse(event.nativeEvent.data);
      const tempInstanceResult = { ...instanceResult };
      // If value is unreadable, set to notDefined.
      if (!result.value) {
        result.value = "notDefined";
      }
      tempInstanceResult[result.functionName] = result.value;
      setInstanceResult((instanceResult) => tempInstanceResult);
      latestResult.current = tempInstanceResult;
      latestCount.current = true;
    } else {
      props.onPress?.(JSON.parse(event.nativeEvent.data));
    }
  }

  /**
   * Support third-party extension.
   * extension: array
   */
  useEffect(() => {
    let result = ``;
    props.extension &&
      props.extension.map((res) => {
        if (res.indexOf("http") === 0) {
          result += `<script src="${res}"></script>`;
        } else {
          result += `<script>${res}</script>`;
        }
      });
    setExtensionScript(result);
  }, [props.extension]);

  return (
    <View style={{ flex: 1, height: props.height || 400 }}>
      <WebView
        androidHardwareAccelerationDisabled={true}
        textZoom={100}
        scrollEnabled={true}
        style={{
          height: props.height || 400,
          backgroundColor: props.backgroundColor || "transparent",
        }}
        {...props.webViewSettings}
        ref={echartRef}
        injectedJavaScript={renderChart(props)}
        scalesPageToFit={Platform.OS !== "ios"}
        originWhitelist={["*"]}
        source={{ html: `${HtmlWeb} ${extensionScript}` }}
        onMessage={onMessage}
      />
    </View>
  );
}

Echarts = forwardRef(Echarts);
export default Echarts;
