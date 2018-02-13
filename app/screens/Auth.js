import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import LoginForm from '../components/auth/LoginForm';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$purple',
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

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
  }

  emailHandler(text) {
    this.setState({
      email: text,
    });
  }

  passwordHandler(text) {
    this.setState({
      password: text,
    });
  }

  loginHandler() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Text style={styles.logo}> HelpMates </Text>
        </View>
        <View>
          <LoginForm
            emailHandler={this.emailHandler}
            passwordHandler={this.passwordHandler}
            loginHandler={this.loginHandler}
          />
          {/* <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Home')} /> */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
