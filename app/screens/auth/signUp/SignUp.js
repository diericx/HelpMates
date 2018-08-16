import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, Dimensions, Text, View, Image } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { UpdateAvatar } from '../../../lib/F7';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

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

// Component Enhancer that adds props.firebase and creates a listener for
// files them passes them into props.uploadedFiles
const enhance = compose(
  firebaseConnect(),
  connect( ({ firebase: { auth, profile }, firestore }) => ({
    profile,
    auth,
  }))
)

class SignUp extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      name: '',
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
  }

  handleCreateAccount = async () => {
    const { firebase, navigation } = this.props;
    const { name, email, password, uri } = this.state;
    const university = navigation.getParam('university', null);
    console.log("Creating account: ", email, password)

    if (this.validInput()) {
      console.log('firebase sign in...')

      // Create the new user
      let user = await firebase.createUser({email, password}, {
        activeUniversityId: university.id,
        name
      });

      // Upload the user's avatar after they sign in
      await UpdateAvatar(uri, firebase);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create an Account</Text>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>

        <ChooseAvatar 
          uri={this.state.uri}
          onComplete={(result) => this.setState({uri: result.uri})} 
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

export default enhance(SignUp);