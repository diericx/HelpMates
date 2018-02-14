import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native';
import Meteor from 'react-native-meteor';

import LoginForm from '../components/auth/LoginForm';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$purple',
  },
  error: {
    color: 'red',
  },
  input: {
    color: 'black',
    backgroundColor: 'gray',
    marginTop: 20,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  logo: {
    fontSize: 55,
    color: 'white',
    fontFamily: 'Milkshake',
    paddingTop: 50,
  },
});

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'zac@gmail.com',
      password: 'dash2233',
      error: null,
    };

    this.loginHandler = this.loginHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != null) {
      this.props.navigation.navigate('ChooseCourse');
    }
  }

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

  loginHandler() {
    // get email and password from state
    const { email, password } = this.state;
    // check validity of e and p
    if (this.isValid()) {
      // attempt to sign in
      Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
          this.setState({ error: error.reason });
        } else {
          // const user = Meteor.users.findOne(Meteor.userId());
          this.props.navigation.goBack();
        }
      });
    }
  }

  renderLoginForm() {
    return (
      <View>
        <LoginForm
          emailHandler={email => this.setState({ email })}
          passwordHandler={password => this.setState({ password })}
          loginHandler={this.loginHandler}
        />
      </View>
    );
  }

  renderLoggingIn() {
    return <Text> Logging in... </Text>;
  }

  render() {
    const { loggingIn, user } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Text style={styles.logo}> HelpMates </Text>
          <Text style={styles.error}> {this.state.error} </Text>
        </View>
        {loggingIn === false && !user ? this.renderLoginForm() : this.renderLoggingIn()}
      </KeyboardAvoidingView>
    );
  }
}

AuthScreen.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default AuthScreen;
