/**
 * RNEcharts entrance.
 * Build a bridge between echarts and React-Native.
 */
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Container, Echarts } from "./src/components";

function APP(props, ref) {
  const chartRef = useRef();
  useImperativeHandle(ref, () => ({
    setNewOption(option, optionSetting) {
      chartRef.current.setNewOption(option, optionSetting);
    },
    /**
     * 触发ECharts 中支持的图表行为
     * Chart actions supported by ECharts are triggered through dispatchAction.
     * @param {object|array} action
     */
    dispatchAction(action) {
      chartRef.current.dispatchAction(action);
    },
    /**
     * Get echarts instance support function.
     * @param {string} functionName
     * @param {object} params
     */
    async getInstance(functionName, params) {
      return await chartRef.current.getInstance(functionName, params);
    },
  }));
  return (
    <Container width={props.width}>
      <Echarts {...props} ref={chartRef} />
    </Container>
  );
}

APP = forwardRef(APP);
export default APP;
