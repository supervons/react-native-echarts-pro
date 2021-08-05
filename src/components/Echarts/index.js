import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import WebView from "react-native-webview";
import renderChart from "./renderChart";
import HtmlWeb from "../Utils/HtmlWeb";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "我是默认值",
    };
    this.setNewOption = this.setNewOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  setNewOption(option) {
    this.refs.chart.postMessage(JSON.stringify(option));
  }

  onMessage(event) {
    const echartsData = JSON.parse(event.nativeEvent.data);
    // 判断监听类型
    if (echartsData.type == "datazoom") {
      this.props.onDataZoom ? this.props.onDataZoom() : null;
    } else if (echartsData.type == "legendselectchanged") {
      this.props.legendSelectChanged
        ? this.props.legendSelectChanged(echartsData.name)
        : null;
    } else {
      this.props.onPress
        ? this.props.onPress(JSON.parse(event.nativeEvent.data))
        : null;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, height: this.props.height || 400 }}>
        <WebView
          textZoom={100}
          ref="chart"
          scrollEnabled={true}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || "transparent",
          }}
          scalesPageToFit={Platform.OS !== "ios"}
          originWhitelist={["*"]}
          source={{ html: HtmlWeb }}
          onMessage={this.onMessage.bind(this)}
        />
      </View>
    );
  }
}
