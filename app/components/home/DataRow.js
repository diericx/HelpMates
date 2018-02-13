import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default class DataRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> {this.props.title1} </Text>
      </View>
    );
  }
}
