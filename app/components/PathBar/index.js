import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

const PathBar = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {props.path} </Text>
    </View>
  );
};

export default PathBar;