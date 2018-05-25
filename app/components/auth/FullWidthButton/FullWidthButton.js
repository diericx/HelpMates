import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from "./styles";

const FullWidthButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}
    >
      <Text style={styles.label}> {props.label} </Text>
    </TouchableOpacity>
  );
};

export default FullWidthButton;