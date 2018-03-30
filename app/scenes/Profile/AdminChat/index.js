import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from './styles';

export default class Index extends React.Component {
  static navigationOptions = {
    headerTitle: 'Chat with us!'
  };

  render() {
    return (
      <View>
        <Text>admin chat texting</Text>
      </View>
    );
  }
}
