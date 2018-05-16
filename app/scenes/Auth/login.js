import React, { Component } from "react";
import Meteor from "react-native-meteor";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import LoginForm from "./components/LoginForm";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$turquoise",
    alignItems: "center",
    paddingTop: 40
  },
  headerContainer: {
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    color: "$bgColor"
  },
  error: {
    color: "red"
  }
});

export default class Login extends Component {
  static navigationOptions = {
    header: false
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
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
      this.setState({ error: "Enter a valid school email address" });
    } else if (password.length === 0) {
      this.setState({ error: "You must enter a password" });
    }

    return valid;
  }

  // attempt to login to server
  loginHandler() {
    Keyboard.dismiss();
    // get email and password from state
    const { email, password } = this.state;
    // check validity of e and p
    if (this.isValid()) {
      // attempt to sign in
      Meteor.loginWithPassword(email, password, error => {
        if (error) {
          console.log(error);
          this.setState({ error: error.reason });
        } else {
        }
      });
    } else {
      console.log("not valid");
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
      </TouchableWithoutFeedback>
    );
  }
}
