import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, Dimensions, Text, View, Image } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';

import Icon from "@expo/vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.background,
  },
  buttons: {
    flexDirection: 'row',
  },
  error: {
    height: 28,
    justifyContent: 'center',
    width: window.width,
    alignItems: 'center',
  },
  errorText: {
    // color: colors.errorText,
    fontSize: 14,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  logo: {
    width: 125,
    height: 125,
  },
  headerText: {
    fontSize: 30,
    // color: colors.headerText,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  subHeaderText: {
    fontSize: 20,
    // color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordVisible: false,
      error: null,
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleError = (error) => {
    if (this.mounted) {
      this.setState({ error });
    }
  }

  validInput = (overrideConfirm) => {
    const { email, password, confirmPassword, confirmPasswordVisible } = this.state;
    let valid = true;

    if (email.length === 0 || password.length === 0) {
      this.handleError('Email and password cannot be empty.');
      valid = false;
    }

    if (!overrideConfirm && confirmPasswordVisible && password !== confirmPassword) {
      this.handleError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      this.handleError(null);
    }

    return valid;
  }

  handleSignIn = () => {
    if (this.validInput(true)) {
      const { email, password } = this.state;
      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          this.handleError(err.reason);
        }
      });
    }
  }

  handleCreateAccount = () => {
    const { email, password, confirmPasswordVisible } = this.state;

    if (confirmPasswordVisible && this.validInput()) {
      Accounts.createUser({ email, password }, (err) => {
        if (err) {
          this.handleError(err.reason);
        } else {
          // hack because react-native-meteor doesn't login right away after sign in
          this.handleSignIn();
        }
      });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({ confirmPasswordVisible: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>

          <Text style={styles.headerText}>React Native Meteor</Text>
          <Text style={styles.subHeaderText}>Boilerplate</Text>
        </View>

        <Input
          placeholder="School Email"
          placeholderTextColor="rgba(255,255,255, 0.6)"
          leftIcon={
            <Icon name="envelope-o" color="rgba(255,255,255, 0.6)" size={25} />
          }
          keyboardType="email-address"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={text => this.props.emailHandler(text)}
        />

        <View style={styles.error}>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>

        <View style={styles.buttons}>
          <Button text="Sign In" onPress={this.handleSignIn} />
          <Button text="Create Account" onPress={this.handleCreateAccount} />
        </View>

      </View>
    );
  }
}

export default Login;