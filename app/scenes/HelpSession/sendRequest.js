import React from 'react';
import { View, Text, Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#00000080',
  },
});

export default class SendHelpSessionRequest extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Send Request </Text>
      </View>
    );
  }
}
