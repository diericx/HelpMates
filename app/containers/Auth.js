import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import AuthIndexScreen from '../scenes/Auth/index.js';

export default (AuthIndexScreenContainer = createContainer(
  ownProps => ({
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
  }),
  AuthIndexScreen,
));
