import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    width: "$screenWidth"
  },
  input: {
    color: "black",
    backgroundColor: "rgba(230,230,230,0.8)",
    height: 45,
    marginBottom: 18,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#32ff7e",
    paddingVertical: 15
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center"
  }
});

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
          placeholder="Full Name"
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
