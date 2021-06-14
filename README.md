
# react-native-echarts-pro
[![NPM Version](https://img.shields.io/npm/v/react-native-echarts-pro.svg?style=flat)](https://www.npmjs.com/package/react-native-echarts-pro)
[![NPM Version](https://img.shields.io/npm/dm/react-native-echarts-pro.svg?style=flat)](https://www.npmjs.com/package/react-native-echarts-pro)

English  [简体中文](/README_CN.md "中文介绍")
### Better charting tools based on native-echarts.

## Summary
```
Core：
1. Solve the problem of android tpl.html file reference;
2. echarts version upgraded to 5.1.2;
3. Support all kinds of original charts, new support map chart;
4. Continuous optimization...
```

## Getting started

`$ npm install react-native-echarts-pro --save`

## Rely
`$ npm install react-native-webview --save`

## Usage
### 1.Base Usage
<img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/pieDemo.png" alt="iOS基本使用" height="500" align="center" /><img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/pieDemo_android.png" alt="androd基本使用" height="500" align="center" />

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.pieOption = {
      color: this.colors,
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderColor: '#668BEE',
        borderWidth: 1,
        padding: [5, 10],
        textStyle: {
          color: '#24283C',
          fontSize: 12
        },
        trigger: 'item',
        // formatter: '{b} <br/>{c} : ({d}%)',
        formatter: function(a) {
          return (
            '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
            a['color'] +
            ';margin-right: 5px;border-radius: 50%;}"></i>' +
            a['name'] +
            '</br>测试:  ' +
            a['value'] +
            '个 ' +
            '<br>占比:  ' +
            a['percent'] +
            '%'
          );
        }
      },
      series: [
        {
          name: '广告访问来源',
          type: 'pie',
          legendHoverLink: true,
          hoverAnimation: true,
          avoidLabelOverlap: true,
          startAngle: 180,
          radius: '55%',
          center: ['50%', '35%'],
          data: [{ value: 105.2, name: 'android' }, { value: 310, name: 'iOS' }, { value: 234, name: 'web' }],
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: '#23273C'
              }
            }
          },
          emphasis: {
            lable: {
              show: true,
              fontSize: 12,
              color: '#668BEE'
            },
            itemStyle: {
              show: true,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  render() {
    return (
      <View style={{ height: 300, paddingTop: 25  }}>
        <RNEChartsPro height={250} option={this.pieOption} />
      </View>
    );
  }
}

```
### 2.Map Usage
<img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/mapDemo.png" alt="iOS地图图片" height="500" align="bottom" /><img src="https://raw.githubusercontent.com/supervons/ImageLibrary/master/react-native-echarts-pro/mapDemo_android.png" alt="android地图图片" height="500" align="bottom" />

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.mapData = {
      visualMap: {
        show: false,
        left: 'right',
        top: 'center',
        min: 1,
        max: 3,
        calculable: true
      },
      series: [
        {
          type: 'map',
          map: 'world',
          mapType: 'world',
          selectedMode: 'single', //multiple多选
          itemStyle: {
            normal: {
              areaStyle: { color: '#B1D0EC' },
              color: '#B1D0EC',
              borderColor: '#dadfde' //区块的边框颜色
            },
            emphasis: {
              //鼠标hover样式
              label: {
                show: true,
                textStyle: {
                  color: '#000000'
                }
              }
            }
          },
          data: [],
          roam: true
        }
      ],
      toolbox: {
        // 显示策略，可选为：true（显示） | false（隐藏）
        show: true,
        // 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
        orient: 'horizontal',
        // 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        x: 'left',
        // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
        y: 'bottom',
        // 工具箱背景颜色，默认透明
        backgroundColor: '#1e90ff60',
        // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
        itemGap: 10,
        // 工具箱icon大小，单位（px）
        itemSize: 10,
        // 工具箱icon颜色序列，循环使用，同时支持在具体feature内指定color
        color: '#ffffff',
        // 是否显示工具箱文字提示，默认启用
        showTitle: false,
        feature: {
          // 还原，复位原始图表
          restore: {
            show: true,
            title: '还原'
          }
        }
      }
    };
  }

  render() {
    return (
      <View style={{ height: 300 }}>
        <RNEChartsPro height={250} option={this.mapData} />
      </View>
    );
  }
}

```

## Props

|      Prop       |  Type  |   Default   | Description                                                  |
| :-------------: | :----: | :---------: | ------------------------------------------------------------ |
|     height      | number |     400     | Chart area height                                            |
|     option      | object |    null     | Chart data configuration items, see details：https://echarts.apache.org/zh/option.html#title |
| backgroundColor | string | transparent | Chart background color                                       |
|    themeName    | string |      -      | There are only six officially available themes:<br />vintage \|\| dark \|\| macarons \|\| infographic \|\| shine \|\| roma |

## Method

| Method name  |    Params    |                     Description                     |
| :----------: | :----------: | :-------------------------------------------------: |
| setNewOption |    option    |           Reassign and render the chart.            |
|   onPress    | callbackData | Chart click event,callbackData is the clicked data. |
|  onDataZoom  | callbackData |                  Chart zoom event.                  |

## TODO LIST

1. Custom map data；
2. Custom theme；
