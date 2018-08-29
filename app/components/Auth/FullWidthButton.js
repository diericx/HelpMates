import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    paddingVertical: 25,
  },
  label: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
});

const FullWidthButton = ({ containerStyle, onPress, label }) => (
  <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
    <Text style={styles.label}> {label} </Text>
  </TouchableOpacity>
);

export default FullWidthButton;
