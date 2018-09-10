import React from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import NavigationService from '../../config/navigationService';

/**
 * This is the screen for a simple switch navigator. It will check to see if
 * the user is an admin, and send them to the cooresponding screen. Admin's see
 * all of the feedback issues in order to give responses, wheras users can view
 * their feedback messages.
 */
@compose(
  connect(({ firebase: { profile } }) => ({
    profile,
  }))
)
export default class AdminOrUser extends React.Component {
  // Subscribe to auth events on mount
  componentDidMount() {
    const { profile } = this.props;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (profile && profile.isAdmin) {
      NavigationService.navigate('HelpAdmin');
    } else {
      NavigationService.navigate('HelpUser');
    }
  }

  render() {
    return <View />;
  }
}
