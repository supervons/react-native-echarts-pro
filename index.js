import React, { Component } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { Container, Echarts } from './src/components'

export default class App extends Component {

  setNewOption(option) {
    this.chart.setNewOption(option);
  }

  render() {
    return (
      <Container width={this.props.width}>
        <Echarts {...this.props} ref={e => this.chart = e}/>
      </Container>
    );
  }
}
