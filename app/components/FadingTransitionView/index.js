import React from "react";
import { View, Animated, Dimensions } from 'react-native';

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height


function alphaFade(index, xOffset) {
  return {
    opacity: xOffset.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH, 
        index * SCREEN_WIDTH, 
        (index + 1) * SCREEN_WIDTH
      ],
      outputRange: [0.0, 1.0, 0.0],
    })
  };
}

export default function(props) {
  return (
    <Animated.View style={[props.style, alphaFade(props.index, props.xOffset)]}>
      {props.children}
    </Animated.View>
  )
}