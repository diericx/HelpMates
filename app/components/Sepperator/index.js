import React from 'react';

import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'flex-end', 
    height: 1,
    backgroundColor: 'lightgray'
  }
});

export default class Sepperator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}