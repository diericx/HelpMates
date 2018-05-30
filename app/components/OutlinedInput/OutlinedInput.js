import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Input } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

const OutlinedInput = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      placeholderTextColor="rgba(255,255,255, 0.6)"
      leftIcon={
        <Icon name={props.iconName} color="rgba(255,255,255, 0.6)" size={25} />
      }
      keyboardType={props.keyboardType}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      secureTextEntry={props.secureTextEntry || false}
      autoCorrect={props.autoCorrect || true}
      onChangeText={props.onChangeText}
    />
  );
};

// "envelope-o"
export default OutlinedInput;
