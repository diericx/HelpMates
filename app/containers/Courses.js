import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import CoursesIndexScreen from '../scenes/Courses/index.js';

const UNI_ID = 'bJ2ppiHYrMFRThfWE';

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

export default (CoursesIndexContainer = createContainer(
  ownProps => ({
    courses: Meteor.call('courses.getAllForUni', { universityId: UNI_ID }),
  }),
  CoursesIndexScreen,
));

// const CoursesIndexContainer = createContainer(
//   ownProps => ({
//     courses: Meteor.call('courses.getAllForUni', { universityId: UNI_ID }),
//   }),
//   CoursesIndexScreen,
// );
// CoursesIndexContainer.navigationOptions = { ...NAV_OPTIONS, title: 'Choose a Course' };

// export default CoursesIndexContainer;
