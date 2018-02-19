import React from 'react';
import { View, Text, Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {},
});

export default class Index extends React.Component {
  static navigationOptions = {
    title: 'My Sessions',
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
        <Text> Your requests </Text>
      </View>
    );
  }
}
