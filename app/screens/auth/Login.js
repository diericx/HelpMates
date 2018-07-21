import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, Dimensions, Text, View, Image } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from "@expo/vector-icons/FontAwesome";
import { Input } from "react-native-elements";

import OutlinedInput from "../../components/OutlinedInput";
import Button from "../../components/Button";


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "$turquoise",
  },
  buttons: {
    flexDirection: 'row',
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
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
      error: null,
    };

    // bind
    this.handleSignIn = this.handleSignIn.bind(this);
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
    const { email, password } = this.state;
    let valid = true;

    if (email.length === 0 || password.length === 0) {
      this.handleError('Email and password cannot be empty.');
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
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          // If you need to do anything with the user, do it here
          // The user will be logged in automatically by the 
          // `onAuthStateChanged` listener we set up in App.js earlier
        })
        .catch((error) => {
          const { code, message } = error;
          // For details of error codes, see the docs
          // The message contains the default Firebase string
          // representation of the error
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Log In</Text>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>

        <OutlinedInput 
          placeholder="School Email" 
          iconName="envelope-o" 
          keyboardType="email-address"  
          onChangeText={text => {
            this.setState({
              email: text
            })
          }}
        />

        <OutlinedInput 
          placeholder="Password" 
          iconName="lock" 
          keyboardType="email-address"  
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({
              password: text
            })
          }}
        />

        <Button label="Login" onPress={this.handleSignIn}/>

      </View>
    );
  }
}

export default Login;