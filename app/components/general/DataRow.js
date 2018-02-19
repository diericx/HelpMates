import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, TouchableOpacity, Text } from 'react-native';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '$lightBlue',
    borderStyle: 'solid',
    borderBottomColor: '$lightBlueDown',
    borderBottomWidth: 3,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default class DataRow extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.params);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <View>
            <Text> {this.props.title1} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
