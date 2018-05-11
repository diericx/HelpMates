import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

import styles from "./styles";

export default class LoginForm extends Component {
  renderLogin() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="School Email"
          keyboardType="email-address"
          returnKeyType="done"
          placeholderTextColor="rgba(190,190,190,0.7)"
          onChangeText={text => this.props.emailHandler(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          placeholderTextColor="rgba(190,190,190,0.7)"
          onChangeText={text => this.props.passwordHandler(text)}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.props.onSubmit}
        >
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderSignUp() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First and Last Name"
          returnKeyType="done"
          placeholderTextColor="rgba(190,190,190,0.7)"
          onChangeText={text => this.props.nameHandler(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="School Email"
          keyboardType="email-address"
          returnKeyType="done"
          placeholderTextColor="rgba(190,190,190,0.7)"
          onChangeText={text => this.props.emailHandler(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Venmo handle"
          keyboardType="email-address"
          returnKeyType="done"
          placeholderTextColor="rgba(190,190,190,0.7)"
          onChangeText={text => this.props.emailHandler(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          returnKeyType="go"
          placeholderTextColor="rgba(190,190,190,0.7)"
          onChangeText={text => this.props.passwordHandler(text)}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.props.onSubmit}
        >
          <Text style={styles.buttonText}> SIGN UP </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.props.form === "login") {
      return this.renderLogin();
    } else if (this.props.form === "signup") {
      return this.renderSignUp();
    }
  }
}
