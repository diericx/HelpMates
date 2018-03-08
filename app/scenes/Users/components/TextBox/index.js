import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './styles';

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="What do you need help with?"
          editable
          autoFocus
          maxLength={40}
          returnKeyType="done"
          onChangeText={this.props.updateMessage}
        />
      </View>
    );
  }
}
