import React from 'react';
import { Button } from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

import EStyleSheet from 'react-native-extended-stylesheet';

const FlatButton = (props) => {
  const { 
    title, 
    loading,  
    containerStyle,
    enabled,
    onPress } = props;

  let styles = EStyleSheet.create({
    container: {
      width: '90%',
      ...props.containerStyle
    },
    button: {
      width: '100%',
      backgroundColor: '$lightblue',
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5,
      marginBottom: 15,
      ...props.style,
    }
  });
  return (
    <Button
      title={title}
      loading={loading}
      titleStyle={{ fontWeight: "700" }}
      buttonStyle={styles.button}
      containerStyle={styles.container}
      onPress={onPress}
      enabled={enabled}
    />
  )
};

export default FlatButton;
