import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { firebaseConnect } from 'react-redux-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';

import OutlinedInput from "../../components/Auth/OutlinedInput";
import FlatButton from "../../components/shared/FlatButton";


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

@firebaseConnect()
class SignUp extends Component {

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
    const { firebase } = this.props;
    if (this.validInput(true)) {
      const { email, password } = this.state;
      firebase.login({email, password})
        .then((user) => {
          // If you need to do anything with the user, do it here
          // The user will be logged in automatically by the 
          // `onAuthStateChanged` listener we set up in App.js earlier
          this.props.navigation.navigate('App');
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

        <FlatButton 
          title="Login" 
          onPress={this.handleSignIn}
        />

      </View>
    );
  }
}

export default SignUp;