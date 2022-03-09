
# react-native-echarts-pro
[![NPM Version](https://img.shields.io/npm/v/react-native-echarts-pro.svg?style=flat)](https://www.npmjs.com/package/react-native-echarts-pro)
[![NPM Version](https://img.shields.io/npm/dm/react-native-echarts-pro.svg?style=flat)](https://www.npmjs.com/package/react-native-echarts-pro)

English  [简体中文](/README_CN.md "中文介绍")
### Better charting tools based on apeach-echarts.
Thanks for native-echarts(@somonus).

## Summary
#### Core：

1. Solve the problem of android tpl.html file reference;
2. echarts version upgraded to 5.3.0;
3. Support all kinds of charts;
4. Support map chart;
5. Support Extensions;
6. Support Typescript;

## Getting started

`$ npm install react-native-echarts-pro --save`

## Rely
`$ npm install react-native-webview --save`

## Usage
### 1.Base Usage
<img src="https://cdn.jsdelivr.net/gh/supervons/ImageLibrary@v1.0.0/react-native-echarts-pro/pieDemo.png" alt="iOS基本使用" height="500" align="center" /><img src="https://cdn.jsdelivr.net/gh/supervons/ImageLibrary@v1.0.0/react-native-echarts-pro/pieDemo_android.png" alt="androd基本使用" height="500" align="center" />

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
          "</br>Test:  " +
          a["value"] +
          "个 " +
          "<br>proportion:  " +
          a["percent"] +
          "%"
        );
      },
    },
    series: [
      {
        name: "Source",
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
### 2.Map Usage
<img src="https://cdn.jsdelivr.net/gh/supervons/ImageLibrary@v1.0.0/react-native-echarts-pro/mapDemo.png" alt="iOS地图图片" height="500" align="bottom" /><img src="https://cdn.jsdelivr.net/gh/supervons/ImageLibrary@v1.0.0/react-native-echarts-pro/mapDemo_android.png" alt="android地图图片" height="500" align="bottom" />

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
    geo: [
      {
        type: "map",
        map: "world",
        mapType: "world",
        selectedMode: "single",
        itemStyle: {
          normal: {
            areaStyle: { color: "#B1D0EC" },
            color: "#eeeeee",
            borderColor: "#dadfde",
          },
          emphasis: {
            //mouse hover style
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
    series: {
      type: "effectScatter",
      coordinateSystem: "geo",
      geoIndex: 0,
      symbolSize: function (params) {
        return (params[2] / 100) * 15 + 5;
      },
      itemStyle: {
        color: "red",
      },
      data: [[116.4551, 40.2539, 10]],
    },
    toolbox: {
      // According to strategy, optional: true (display) | false (hidden)
      show: true,
      // Layout, the default value is horizontal layout, optional for: 'horizontal' | 'vertical'
      orient: "horizontal",
      // Horizontal position, the default for map centered, optional for: 'center' | 'left' | 'right' | {number} (x coordinate, px)
      x: "left",
      // Vertical position, the default for the top of the map, can be selected as: 'top' | 'bottom' | 'center' | {number} (y, px)
      y: "bottom",
      // Toolbox background color, transparent by default
      backgroundColor: "#1e90ff60",
      // The interval between each item (unit: px, default: 10) is horizontal for horizontal layout and vertical for vertical layout
      itemGap: 10,
      // Toolbox icon size, unit (px)
      itemSize: 10,
      // Toolbox icon color sequence, recycling, and support to specify a color in a specific feature
      color: "#ffffff",
      // Whether to display the toolbox text prompt. Enabled by default
      showTitle: false,
      feature: {
        // Restore, reset the original diagram
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

## Props

|       Prop        |  Type  |   Default   | Require |                         Description                          |
| :---------------: | :----: | :---------: | :-----: | :----------------------------------------------------------: |
|      height       | number |     400     |    Y    |                      Chart area height                       |
|      option       | object |    null     |    Y    | Chart data configuration items, see details：https://echarts.apache.org/en/option.html#title |
|  backgroundColor  | string | transparent |    N    |                    Chart background color                    |
|     themeName     | string |      -      |    N    | There are only six officially available themes:<br />vintage \|\| dark \|\| macarons \|\| infographic \|\| shine \|\| roma |
|  webViewSettings  | object |    null     |    N    |            Customize WebView container properties            |
| formatterVariable | object |    null     |    N    |   If option’formatter function need variable,can use this.   |
|   customMapData   | object |    null     |    N    | For custom maps, null is a world map. See the following usage examples |

### webViewSettings
The properties of the `WebView` used internally are dynamically set as follows, after the loading of `Echarts`, an `alert` will be output
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
If the method in `option` uses variables, it can be passed through this attribute
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
        formatterVariable={{ unit: "dollar" }}
        option={pieOption}
      />
    </View>
  );
```

### extension
Dynamic support for tripartite expansion, such as word cloud, water polo map, etc.
example（`echarts-liquidfill`）：

```javascript
const liquidOption = {
    title: {
      text: "水球图",
      left: "center",
    },
    series: [
      {
        type: "liquidFill",
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
        extension={[ // Dynamically import third-party CDN or import min.js file
          "https://cdn.jsdelivr.net/npm/echarts-liquidfill@3.0.0/dist/echarts-liquidfill.min.js",
        ]}
        option={liquidOption}
      />
    </View>
  );
```

[Demo：ExploreRN](https://github.com/supervons/ExploreRN/blob/master/src/components/charts/chartsExtension.js)

### customMapData

Custom map data, default world map.

```javascript
import ChinaJsonData from "./ChinaJsonData.js";

...
	return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <RNEChartsPro
				...
        customMapData={ChinaJsonData}
      />
    </View>
  );
```

#### ChinaJsonData.js

[Demo](https://github.com/supervons/react-native-echarts-pro/blob/master/src/components/Echarts/map/chinaJson.js)

You can go to this page to download custom map json:

https://geojson.io/

## Method

| Method name  |    Params    |                     Description                     |
| :----------: | :----------: | :-------------------------------------------------: |
| setNewOption |    option    |           Reassign and render the chart.            |
|   onPress    | callbackData | Chart click event,callbackData is the clicked data. |
|  onDataZoom  | callbackData |                  Chart zoom event.                  |

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

## TODO LIST
- [x] Optimizes Map zooming and sliding events;
- [x] Custom map data;
- [x] Supports Typescript;
- [ ] Custom theme;
