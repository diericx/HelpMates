import React, { Component } from 'react';
import { Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, withFirebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { UpdateAvatar } from '../../lib/Firestore';

import ChooseAvatar from '../../components/shared/ChooseAvatar';
import OutlinedInput from '../../components/Auth/OutlinedInput';
import FlatButton from '../../components/shared/FlatButton';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$turquoise',
  },
  buttons: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'white',
  },
});

@compose(
  withFirebase,
  connect(({ firebase: { auth, profile } }) => ({
    profile,
    auth,
  }))
)
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      name: '',
      email: '',
      password: '',
      signUpBtnEnabled: false,
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

  handleError = error => {
    if (this.mounted) {
      this.setState({ error });
    }
  };

  validInput = overrideConfirm => {
    const { email, password, uri } = this.state;
    let valid = true;

    if (email.length === 0 || password.length === 0) {
      this.handleError('Email and password cannot be empty.');
      valid = false;
    }

    if (uri == null) {
      this.handleError('You need a profile picture!');
      valid = false;
    }

    if (valid) {
      this.handleError(null);
    }

    return valid;
  };

  handleCreateAccount = async () => {
    const { firebase, navigation } = this.props;
    const { name, email, password, uri } = this.state;
    const university = navigation.getParam('university', null);

    // Disable the sign up button until we know they should try again
    this.setState({
      signUpBtnEnabled: false,
    });

    if (this.validInput()) {
      // Create the new user
      try {
        // Send request to firebase
        await firebase.createUser(
          { email, password },
          {
            activeUniversityId: university.id,
            name,
          }
        );
      } catch (e) {
        this.setState({
          error: 'We encountered an error creating your account.',
          signUpBtnEnabled: true,
        });
        console.log(e);
      }

      // ASYNC Upload the user's avatar after they sign in
      UpdateAvatar(uri, firebase);

      // ASYNC Send email
      firebase.auth().currentUser.sendEmailVerification();

      // Go to app screen
      this.props.navigation.navigate('WaitingForEmail');
    }
  };

  render() {
    const { signUpBtnEnabled, uri, error } = this.state;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        behavior="position"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Create an Account</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>

            <ChooseAvatar
              uri={uri}
              onComplete={result => {
                console.log('image grab result: ', result.uri);
                this.setState({ uri: result.uri });
              }}
            />

            <OutlinedInput
              placeholder="Full Name"
              iconName="user-o"
              keyboardType="default"
              onChangeText={text => {
                this.setState({
                  name: text,
                });
              }}
            />

            <OutlinedInput
              placeholder="School Email"
              iconName="envelope-o"
              keyboardType="email-address"
              onChangeText={text => {
                this.setState({
                  email: text,
                });
              }}
            />

            <OutlinedInput
              placeholder="Password"
              iconName="lock"
              keyboardType="email-address"
              autoCorrect={false}
              secureTextEntry
              onChangeText={text => {
                this.setState({
                  password: text,
                });
              }}
            />

            <FlatButton
              title="Sign Up"
              onPress={this.handleCreateAccount}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                width: '100%',
                height: 45,
              }}
              enabled={signUpBtnEnabled}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;
