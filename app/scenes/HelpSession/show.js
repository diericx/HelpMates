import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {},
});

export default class Show extends React.Component {
  static navigationOptions = {
    title: 'Session',
    headerStyle: {
      backgroundColor: '#cd84f1',
    },

    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'Milkshake',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Help Session </Text>
      </View>
    );
  }
}
