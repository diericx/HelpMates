import React from "react";
// import PropTypes from "prop-types";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Meteor from "react-native-meteor";

import LoginForm from "./components/LoginForm/index";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18c0ea"
  },
  input: {
    color: "black",
    backgroundColor: "gray",
    marginTop: 20,
    marginBottom: 20
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  logo: {
    fontSize: 55,
    color: "white",
    fontFamily: "Milkshake",
    paddingTop: 50
  },

  buttonContainer: {
    paddingVertical: 25
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center"
  },
  signupButton: {
    backgroundColor: "#32ff7e"
  },
  loginButton: {
    backgroundColor: "#ff9f1a"
  }
});

class AuthScreen extends React.Component {
  // Naviagation options
  static navigationOptions = {
    header: false
  };

  // constructor
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null,
      user: props.user,
      loggingIn: props.loggingIn
    };

    this.goToLoginScreen = this.goToLoginScreen.bind(this);
    this.goToSignupScreen = this.goToSignupScreen.bind(this);
  }

  goToLoginScreen() {
    this.props.navigation.navigate("Login");
  }

  goToSignupScreen() {
    this.props.navigation.navigate("Signup");
  }

  renderLoggingIn() {
    return <Text> Logging in... </Text>;
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" hidden />
        <View style={styles.logoContainer}>
          <Text style={styles.logo}> HelpMates </Text>
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.goToLoginScreen}
        >
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={this.goToSignupScreen}
        >
          <Text style={styles.buttonText}> SIGN UP </Text>
        </TouchableOpacity>
        {/* {!this.state.loggingIn && !this.state.user
          ? this.renderLoginForm()
          : this.renderLoggingIn()} */}
      </View>
    );
  }
}

export default AuthScreen;
