import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import { AuthStack, TabNavigation } from './config/routes';
import Loading from "./components/Loading"
import settings from './config/settings';
import styles from './config/styles';

Meteor.connect(settings.METEOR_URL);

const HelpMates = (props) => {
  const { status, user, loggingIn } = props;
  console.log("STATUS: ", status)

  if (status.connected === false || loggingIn) {
    return <Loading size="large"/>;
  } else if (user !== null) {
    return <TabNavigation />;
  }
  return <AuthStack />;
};

export default createContainer(() => {
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, HelpMates);