import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Dimensions } from 'react-native';

import LoginForm from './components/LoginForm';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 70,
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
  },
  error: {
    color: 'red',
  },
});

export default class Login extends Component {
  static navigationOptions = {
    header: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };

    this.loginHandler = this.loginHandler.bind(this);
  }

  // Check if the username and password are valid
  isValid() {
    const { email, password } = this.state;
    let valid = false;

    if (email.length > 0 && password.length > 0) {
      valid = true;
    }

    if (email.length === 0) {
      this.setState({ error: 'You must enter an email address' });
    } else if (password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    }

    return valid;
  }

  // attempt to login to server
  loginHandler() {
    // get email and password from state
    const { email, password } = this.state;
    // check validity of e and p
    if (this.isValid()) {
      // attempt to sign in
      Meteor.loginWithPassword(email, password, error => {
        if (error) {
          this.setState({ error: error.reason });
        } else {
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Log In </Text>
          <Text style={styles.error}> {this.state.error} </Text>
        </View>
        <View style={styles.form}>
          <LoginForm
            form="login"
            emailHandler={email => this.setState({ email })}
            passwordHandler={password => this.setState({ password })}
            onSubmit={this.loginHandler}
          />
        </View>
      </View>
    );
  }
}
