import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, Dimensions, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from "@expo/vector-icons/FontAwesome";
import { Input } from "react-native-elements";

import ChooseAvatar from "../../../components/ChooseAvatar";
import OutlinedInput from "../../../components/OutlinedInput";
import Button from "../../../components/Button";


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
    color: 'white'
  },
});

class Login extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      email: '',
      password: '',
      uri: null,
      error: null,
    };

    // bind
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
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

  handleCreateAccount = () => {
    const { firebase } = this.context.store;
    const { email, password } = this.state;
    console.log("Creating account: ", email, password)

    if (this.validInput()) {
      console.log('firebase sign in...')
      firebase.auth().createUserWithEmailAndPassword(email, password)
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
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({ confirmPasswordVisible: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Almost done!</Text>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>

        <ChooseAvatar 
          uri={this.state.uri}
          onAvatarChosen={(uri) => this.setState({uri})} 
        />

        <OutlinedInput 
          placeholder="Full Name" 
          iconName="user-o" 
          keyboardType="default"  
          onChangeText={text => {
            this.setState({
              name: text
            })
          }}
        />

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

        <Button label="Sign Up" onPress={this.handleCreateAccount}/>

      </View>
    );
  }
}

export default Login;