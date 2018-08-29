import React from 'react';
import { Input } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  inputContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255, 0.6)",
    height: 45,
    marginBottom: 18,
    paddingHorizontal: 10
  },
  input: {
    color: "white"
  },
});

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
