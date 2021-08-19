/**
 * RNEcharts entrance.
 * Build a bridge between echarts and React-Native.
 */
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { View } from "react-native";
import { Container, Echarts } from "./src/components";

function APP(props, ref) {
  const chartRef = useRef();
  useImperativeHandle(ref, () => ({
    setNewOption(option) {
      chartRef.current.setNewOption(option);
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
