import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    paddingVertical: 25
  },
  label: {
    color: "white",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center"
  },
});

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