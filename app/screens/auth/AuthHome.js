import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';

import FullWidthButton from "../../components/auth/FullWidthButton";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$lightblue"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    marginTop: 50,
    justifyContent: "flex-start"
  },
  logo: {
    fontSize: 55,
    color: "white",
  },
  signupButtonContainer: {
    backgroundColor: "#32ff7e"
  },
  loginButtonContainer: {
    backgroundColor: "#ff9f1a"
  }
});

class AuthHome extends Component {

  constructor(props) {
    super(props);
    
    // bind
    this.onLoginBtn = this.onLoginBtn.bind(this);
    this.onSignUpBtn = this.onSignUpBtn.bind(this);
  }

  onLoginBtn() {
    this.props.navigation.navigate('Login')
  }

  onSignUpBtn() {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}> HelpMates </Text>
        </View>

        <FullWidthButton containerStyle={styles.loginButtonContainer} label="Login" onPress={this.onLoginBtn} />

        <FullWidthButton containerStyle={styles.signupButtonContainer} label="Sign Up" onPress={this.onSignUpBtn} />

      </View>
    )
  }
}

export default AuthHome;