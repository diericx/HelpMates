import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import { Input, Button } from "react-native-elements";

import styles from "./styles";

export default class LoginForm extends Component {
  renderLogin() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="School Email"
          placeholderTextColor="rgba(255,255,255, 0.6)"
          leftIcon={
            <Icon name="envelope-o" color="rgba(255,255,255, 0.6)" size={25} />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={text => this.props.emailHandler(text)}
        />

        <Input
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="rgba(255,255,255, 0.6)"
          leftIcon={
            <SimpleIcon name="lock" color="rgba(255,255,255, 0.6)" size={25} />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
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
        <Input
          placeholder="First and Last Name"
          placeholderTextColor="rgba(255,255,255, 0.6)"
          leftIcon={
            <Icon name="user-o" color="rgba(255,255,255, 0.6)" size={25} />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={text => this.props.nameHandler(text)}
        />
        <Input
          placeholder="School Email"
          placeholderTextColor="rgba(255,255,255, 0.6)"
          leftIcon={
            <Icon name="envelope-o" color="rgba(255,255,255, 0.6)" size={25} />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={text => this.props.emailHandler(text)}
        />
        <Input
          placeholder="Venmo Handle"
          placeholderTextColor="rgba(255,255,255, 0.6)"
          label="We need this so users can easily pay you"
          labelStyle={styles.label}
          value="@"
          leftIcon={
            <Icon name="money" color="rgba(255,255,255, 0.6)" size={25} />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={text => this.props.venmoHandler(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="rgba(255,255,255, 0.6)"
          leftIcon={
            <SimpleIcon name="lock" color="rgba(255,255,255, 0.6)" size={25} />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
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
