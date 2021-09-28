/**
 * Use webview and injectedJavaScript to render the echarts container.
 */
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { View, StyleSheet, Platform } from "react-native";
import WebView from "react-native-webview";
import renderChart from "./renderChart";
import HtmlWeb from "../Utils/HtmlWeb";

function Echarts(props, ref) {
  const echartRef = useRef();
  const [extensionScript, setExtensionScript] = useState("");
  /**
   * Export methods to parent.
   * Parent can use ref to call the methods.
   */
  useImperativeHandle(ref, () => ({
    setNewOption(option) {
      echartRef.current.postMessage(JSON.stringify(option));
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
    if (echartsData.type == "datazoom") {
      props.onDataZoom?.();
    } else if (echartsData.type == "legendselectchanged") {
      props.legendSelectChanged?.(echartsData.name);
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
