import { View, Text } from "react-native";
import React from "react";

import styles from "./styles";

// Button function
export default function BGButton(props) {
  const highlightedStyle = {};
  if (props.highlighted) {
    highlightedStyle.borderBottomWidth = 1;
    highlightedStyle.paddingTop = 1;
  }
  return (
    <View style={[styles.container, highlightedStyle]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}
