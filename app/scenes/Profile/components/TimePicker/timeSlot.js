import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: 50,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
});

export default class TimeSlot extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text />
      </View>
    );
  }
}
