import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import NavigationService from '../../config/navigationService';

const styles = EStyleSheet.create({});

/**
 * This screen is only seen by admins. It will give the admin the ability
 * to see all feedback from user's so they can react to the data.
 */
@compose(
  // Now that we have auth, use the UID
  firestoreConnect(() => [
    {
      collection: 'reports',
      orderBy: ['createdAt'],
    },
    {
      collection: 'feedbackChats',
      orderBy: ['lastMessage'],
    },
  ]),
  // Finally, setup final props
  connect(({ firestore }, { auth }) => ({
    reports: firestore.ordered.reports,
    chats: firestore.ordered.feedbackChats,
    auth,
  }))
)
export default class HelpAdmin extends React.Component {
  render() {
    const { reports, chats } = this.props;

    return (
      <View>
        <Text>You are an admin</Text>
      </View>
    );
  }
}
