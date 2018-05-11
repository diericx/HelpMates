import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Avatar } from "react-native-elements";
import Meteor, { Accounts } from "react-native-meteor";

import LoginForm from "./components/LoginForm";
import ChooseAvatarPhoto from "../../components/ChooseAvatarPhoto/index";
import { UploadProfilePic } from "../../Helpers/S3";
import { SetProfilePic } from "../../Helpers/Meteor";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20
  },
  headerContainer: {
    alignItems: "center"
  },
  headerText: {
    fontSize: 30
  },
  error: {
    color: "red"
  }
});

export default class Signup extends Component {
  static navigationOptions = {
    header: false
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      profilePicURI: "",
      profilePicURL: "",
      error: null
    };

    // bind
    this.signupHandler = this.signupHandler.bind(this);
    this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
    this.onChoosePhoto = this.onChoosePhoto.bind(this);
  }

  onProfilePicUpload(url) {
    // set the profile pic for this user in Meteor
    SetProfilePic(url);
  }

  onChoosePhoto(uri) {
    this.setState({
      profilePicURI: uri
    });
  }

  // Check if the username and password are valid
  isValid() {
    const { email, password, name, profilePicURI } = this.state;
    let valid = false;

    // make sure email is a valid edu email
    let emailTail = email.substr(email.length - 3, 3);
    if (emailTail != "edu") {
      this.setState({ error: "You must enter a valid school email address" });
      return false;
    }

    // make sure password and emial is long enough
    if (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      profilePicURI.length > 0
    ) {
      valid = true;
    }

    if (email.length === 0) {
      this.setState({ error: "You must enter an email address" });
    } else if (password.length === 0) {
      this.setState({ error: "You must enter a password" });
    } else if (name.length === 0) {
      this.setState({ error: "You must enter your full name" });
    } else if (profilePicURI.length == 0) {
      this.setState({ error: "You must provide a profile picture" });
    }

    return valid;
  }

  // attempt to login to server
  signupHandler() {
    Keyboard.dismiss();
    // get email and password from state
    const { email, password, name, profilePicURL } = this.state;
    // check validity of email and password
    if (this.isValid()) {
      Accounts.createUser({ email, password, name, profilePicURL }, error => {
        if (error) {
          this.setState({ error: error.reason });
        } else {
          Meteor.loginWithPassword(email, password, error => {
            if (error) {
              this.setState({ error: error.reason });
            } else {
              // upload the profile pic and set it for this user
              UploadProfilePic(
                this.state.profilePicURI,
                this.onProfilePicUpload
              );
            }
          });
        }
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}> Sign Up </Text>
              <Text style={styles.error}> {this.state.error} </Text>
            </View>
            <ChooseAvatarPhoto
              onChoosePhoto={this.onChoosePhoto}
              profilePicURI={this.state.profilePicURI}
            />
            <View style={styles.form}>
              <LoginForm
                form="signup"
                emailHandler={email => this.setState({ email })}
                passwordHandler={password => this.setState({ password })}
                nameHandler={name => this.setState({ name })}
                onSubmit={this.signupHandler}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
