import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import AuthScreen from '../screens/Auth';

export default (AccountContainer = createContainer(
  ownProps => ({
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
  }),
  AuthScreen,
));
