import React from 'react';
import { Button } from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const FlatButton = (props) => {
  const { 
    title, 
    loading, 
    backgroundColor, 
    width, 
    containerStyle,
    onPress } = props;
  <Button
    title={title}
    loading={loading}
    // loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
    titleStyle={{ fontWeight: "700" }}
    buttonStyle={{
      backgroundColor: {backgroundColor},
      width: {width},
      height: {height},
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5
    }}
    containerStyle={containerStyle}
    onPress={onPress}
  />
};

export default FlatButton;
