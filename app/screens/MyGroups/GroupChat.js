import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Chat from '../../components/shared/Chat/Chat';
import NavigationService from '../../config/navigationService';
import { validate } from '../../lib/Utils';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

@compose(
  withFirestore,
  firestoreConnect(({ navigation }) => {
    // Get groupId from navigation params
    const groupId = navigation.getParam('groupId', null);
    validate('GroupChat.firestoreConnect() groupId should exist as a nav param. ', groupId);

    // Return query config
    return [
      {
        collection: 'groups',
        doc: groupId,
        orderBy: ['createdAt'],
        subcollections: [{ collection: 'messages' }],
        storeAs: `messages-${groupId}`,
      },
    ];
  }),
  connect(({ firestore }, { navigation }) => {
    // Get groupId from navigation params
    const groupId = navigation.getParam('groupId', null);
    return {
      messages: firestore.data[`messages-${groupId}`],
      groupId,
    };
  })
)
class Group extends React.Component {
  constructor() {
    super();
    // bind
    this.sendMessage = this.sendMessage.bind(this);
  }

  /**
   * Sends a message to the group
   * @param {Object} message - The message to be sent
   */
  sendMessage(message) {
    const { firestore, groupId } = this.props;
    firestore.add(
      {
        collection: 'groups',
        doc: groupId,
        subcollections: [{ collection: 'messages' }],
      },
      {
        ...message,
        likes: {},
      }
    );
  }

  render() {
    const { messages } = this.props;
    return (
      <View style={styles.container}>
        <Chat messages={messages} sendMessage={this.sendMessage} />
      </View>
    );
  }
}

export default Group;
