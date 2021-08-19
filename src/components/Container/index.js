import React from "react";
import { View } from "react-native";
import styles from "../../style";

export default function Container(props) {
  return (
    <View style={[styles.container, { width: props.width }]}>
      {props.children}
    </View>
  );
}
