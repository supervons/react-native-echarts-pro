
# react-native-echarts-pro
[![NPM Version](https://img.shields.io/npm/v/react-native-echarts-pro.svg?style=flat)](https://www.npmjs.com/package/react-native-echarts-pro)
[![NPM Version](https://img.shields.io/npm/dm/react-native-echarts-pro.svg?style=flat)](https://www.npmjs.com/package/react-native-echarts-pro)

[English](/README.md "english readme")  简体中文
### 一个基于native-echarts持续优化完善的图表库.

## 综述
#### 核心：

1. 解决android tpl.html文件引入问题;
2. echarts 版本升级至 5.2.0;
3. 支持原有各类图表；
4. 新增支持地图图表;
5. 支持三方动态扩展（水球图、词云等等）

## 让我们开始吧

`$ npm install react-native-echarts-pro --save`

## 依赖
`$ npm install react-native-webview --save`

## 示例
### 1.基本示例
<img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/pieDemo.png" alt="iOS基本使用" height="500" align="center" /><img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/pieDemo_android.png" alt="androd基本使用" height="500" align="center" />

```javascript
import React from "react";
import { View } from "react-native";
import RNEChartsPro from "react-native-echarts-pro";

export default function Demo() {
  const pieOption = {
    tooltip: {
      backgroundColor: "rgba(255,255,255,0.8)",
      borderColor: "#668BEE",
      borderWidth: 1,
      padding: [5, 10],
      textStyle: {
        color: "#24283C",
        fontSize: 12,
      },
      trigger: "item",
      formatter: function (a) {
        return (
          '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
          a["color"] +
          ';margin-right: 5px;border-radius: 50%;}"></i>' +
          a["name"] +
          "</br>测试:  " +
          a["value"] +
          "个 " +
          "<br>占比:  " +
          a["percent"] +
          "%"
        );
      },
    },
    series: [
      {
        name: "广告访问来源",
        type: "pie",
        legendHoverLink: true,
        hoverAnimation: true,
        avoidLabelOverlap: true,
        startAngle: 180,
        radius: "55%",
        center: ["50%", "35%"],
        data: [
          { value: 105.2, name: "android" },
          { value: 310, name: "iOS" },
          { value: 234, name: "web" },
        ],
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: "#23273C",
            },
          },
        },
        emphasis: {
          lable: {
            show: true,
            fontSize: 12,
            color: "#668BEE",
          },
          itemStyle: {
            show: true,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <RNEChartsPro height={250} option={pieOption} />
    </View>
  );
}
```
### 2.地图示例
<img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/mapDemo.png" alt="iOS地图图片" height="500" align="bottom" /><img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/mapDemo_android.png" alt="android地图图片" height="500" align="bottom" />

```javascript
import React from "react";
import { View } from "react-native";
import RNEChartsPro from "react-native-echarts-pro";

export default function Demo() {
  const mapData = {
    visualMap: {
      show: false,
      left: "right",
      top: "center",
      min: 1,
      max: 3,
      calculable: true,
    },
    series: [
      {
        type: "map",
        map: "world",
        mapType: "world",
        selectedMode: "single", //multiple多选
        itemStyle: {
          normal: {
            areaStyle: { color: "#B1D0EC" },
            color: "#B1D0EC",
            borderColor: "#dadfde", //区块的边框颜色
          },
          emphasis: {
            //鼠标hover样式
            label: {
              show: true,
              textStyle: {
                color: "#000000",
              },
            },
          },
        },
        data: [],
        roam: true,
      },
    ],
    toolbox: {
      // 显示策略，可选为：true（显示） | false（隐藏）
      show: true,
      // 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
      orient: "horizontal",
      // 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
      x: "left",
      // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
      y: "bottom",
      // 工具箱背景颜色，默认透明
      backgroundColor: "#1e90ff60",
      // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
      itemGap: 10,
      // 工具箱icon大小，单位（px）
      itemSize: 10,
      // 工具箱icon颜色序列，循环使用，同时支持在具体feature内指定color
      color: "#ffffff",
      // 是否显示工具箱文字提示，默认启用
      showTitle: false,
      feature: {
        // 还原，复位原始图表
        restore: {
          show: true,
          title: "还原",
        },
      },
    },
  };

  return (
    <View style={{ height: 300 }}>
      <RNEChartsPro height={250} option={mapData} />
    </View>
  );
}
```

## 属性

|       属性        |  类型  |   默认值    | 必须 | 描述                                                         |
| :---------------: | :----: | :---------: | :--: | ------------------------------------------------------------ |
|      height       | number |     400     |  Y   | 图表区域高度                                                 |
|      option       | object |    null     |  Y   | 图表数据配置项，详情参看：https://echarts.apache.org/zh/option.html#title |
|  backgroundColor  | string | transparent |  N   | 图表背景颜色                                                 |
|     themeName     | string |      -      |  N   | 目前仅有官方提供的六个主题：<br />vintage \|\| dark \|\| macarons \|\| infographic \|\| shine \|\| roma |
|  webViewSettings  | object |    null     |  N   | 自定义 WebView 容器属性                                      |
| formatterVariable | object |    null     |  N   | option 中 formatter 方法需要使用动态变量时，可以在此注入     |
|     extension     | array  |    null     |  N   | 支持动态添加三方扩展                                         |

### webViewSettings

```javascript
  return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <RNEChartsPro
        webViewSettings={{ // <==There
          scrollEnabled: true,
          onLoadEnd: () => {
            alert(1);
          },
          style: {
            backgroundColor: "red",
          },
        }}
        onPress={res => alert(JSON.stringify(res))}
        legendSelectChanged={res => alert(res)}
        height={250}
        option={pieOption}
      />
    </View>
  );
```

### formatterVariable

```javascript
	const pieOption = {
    yAxis: {
        axisLabel: {
            formatter(value) {
                return value + formatterVariable.unit;
            }
        }
    }
    ...
  }
	return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <RNEChartsPro
				...
        formatterVariable={{ unit: "美元" }}
        option={pieOption}
      />
    </View>
  );
```

### extension

示例（`echarts-liquidfill`）：

```javascript
const liquidOption = {
    title: {
      text: "水球图",
      left: "center",
    },
    series: [
      {
        type: "liquidFill", // Echarts does not support this module
        data: [0.6],
        color: ["#afb11b"],
        itemStyle: {
          opacity: 0.6,
        },
        emphasis: {
          itemStyle: {
            opacity: 0.9,
          },
        },
      },
    ],
  };
	return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <RNEChartsPro
				...
        extension={[ // 动态引入三方 CDN 或者导入 min.js 文件
          "https://cdn.jsdelivr.net/npm/echarts-liquidfill@3.0.0/dist/echarts-liquidfill.min.js",
        ]}
        option={liquidOption}
      />
    </View>
  );
```



## 方法

|    方法名    |     参数     |                   描述                   |
| :----------: | :----------: | :--------------------------------------: |
| setNewOption |    option    |           重新赋值并渲染图表。           |
|   onPress    | callbackData | 图表点击事件，callbackData为点击的数据。 |
|  onDataZoom  | callbackData |              图表缩放事件。              |

### setNewOption
```javascript
<RNEChartsPro ref={(echarts) => (this.echarts = echarts)} option={this.state.options}/>

// use
this.echarts.setNewOption({...})
```
### onPress
```javascript
// res is an object :{name:"", value:""}
<RNEChartsPro onPress={res => alert(JSON.stringify(res))} option={this.state.options}/>
```
