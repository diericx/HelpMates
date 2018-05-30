import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <Text style={styles.label}> {props.label} </Text>
    </TouchableOpacity>
  );
};

export default Button;
