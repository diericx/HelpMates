import React from "react";
import { Button } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

// Styles
const styles = EStyleSheet.create({
  buttonStyle: {
    height: 45,
    backgroundColor: "$green",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    width: "$screenWidth - 50",
    marginBottom: 10
  },
  containerStyle: {
    alignItems: "center"
  }
});

// Button function
export function CButton(props) {
  return (
    <Button
      title={props.title}
      textStyle={{ fontWeight: "700" }}
      buttonStyle={[styles.buttonStyle, props.buttonStyle]}
      style={[styles.containerStyle, props.containerStyle]}
      onPress={props.onPress}
    />
  );
}
