import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Dimensions } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';

import LoginForm from './components/LoginForm';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
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

export default class Signup extends Component {
  static navigationOptions = {
    header: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      error: null,
    };

    this.signupHandler = this.signupHandler.bind(this);
  }

  // Check if the username and password are valid
  isValid() {
    const { email, password, name } = this.state;
    let valid = false;

    if (email.length > 0 && password.length > 0) {
      valid = true;
    }

    if (email.length === 0) {
      this.setState({ error: 'You must enter an email address' });
    } else if (password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    } else if (name.length === 0) {
      this.setState({ error: 'You must enter your full name' });
    }

    return valid;
  }

  // attempt to login to server
  signupHandler() {
    // get email and password from state
    const { email, password, name } = this.state;
    // check validity of e and p
    if (this.isValid()) {
      Accounts.createUser({ email, password, name }, error => {
        if (error) {
          this.setState({ error: error.reason });
        } else {
          Meteor.loginWithPassword(email, password, error => {
            if (error) {
              this.setState({ error: error.reason });
            } else {
            }
          });
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
            form="signup"
            emailHandler={email => this.setState({ email })}
            passwordHandler={password => this.setState({ password })}
            nameHandler={name => this.setState({ name })}
            onSubmit={this.signupHandler}
          />
        </View>
      </View>
    );
  }
}
