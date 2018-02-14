import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

class Items extends Component {
  render() {
    return (
      <View>
        <Text> {this.props.count} </Text>
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
