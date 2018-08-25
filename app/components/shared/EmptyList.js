import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5
  },
  centered: {
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: '$gray',
    textAlign: 'center',
    paddingHorizontal: 5
  }
});

/**
 * EmptyList - Rendered when a list is empty.
 * @param {Object} props {text, centered} 
 */
export default EmptyList = function (props) {
  return (
  <View style={[styles.container, props.centered ? styles.centered : null]}>
    <Text style={styles.text}>{props.text}</Text>
  </View>
  )
}