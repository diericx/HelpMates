import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

class Items extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text> Log In </Text>
        </View>
      </View>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('courses');
  return {
    count: Meteor.collection('courses').find().length,
  };
}, Items);
