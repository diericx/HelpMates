import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import ChooseTutorScreen from '../scenes/Users/chooseTutor.js';

const NAV_OPTIONS = {
  title: 'HelpMates',
  headerStyle: {
    backgroundColor: '#cd84f1',
  },

  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Milkshake',
  },
};

export const ChooseTutorContainer = createContainer(props => ({}), ChooseTutorScreen);
ChooseTutorContainer.navigationOptions = { ...NAV_OPTIONS, title: 'Find someone cool' };
