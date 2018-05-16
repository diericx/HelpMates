import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './styles';

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={this.props.placeholder}
          editable
          autoFocus
          maxLength={40}
          returnKeyType="done"
          onChangeText={this.props.updateInitialMessageText}
        />
      </View>
    );
  }
}
