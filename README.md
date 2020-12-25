
# react-native-echarts-pro

## Getting started

`$ npm install react-native-echarts-pro --save`

### Manual installation


## Usage
```javascript
import RNEchartsPro from 'react-native-echarts-pro';

export default class Demo {
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
          data: [
            { value: 105.2, name: 'android' },
            { value: 310, name: 'iOS' },
            { value: 234, name: 'web' }
          ],
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
      <View style={{ height: 300 }}>
        <RNEchartsPro height={250} option={this.pieOption} />
      </View>
    );
  }
}
```
