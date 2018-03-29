import React from 'react';
import { View, ActivityIndicator as AI } from 'react-native';

export default function ActivityIndicator(props) {
  return (
    <View style={[{ marginTop: props.marginTop }, props.style]}>
      <AI animating size={props.size} />
    </View>
  );
}
