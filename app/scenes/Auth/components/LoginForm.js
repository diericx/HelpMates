import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 45,
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#32ff7e',
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={text => this.props.emailHandler(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          returnKeyType="go"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={text => this.props.passwordHandler(text)}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={this.props.loginHandler}>
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
