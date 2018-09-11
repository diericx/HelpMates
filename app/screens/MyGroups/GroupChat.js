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
  connect(({ firestore: { data }, firebase: { auth } }, { navigation }) => {
    // Get groupId from navigation params
    const groupId = navigation.getParam('groupId', null);
    return {
      messages: data[`messages-${groupId}`],
      auth,
      groupId,
    };
  })
)
class Group extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.sendMessage = this.sendMessage.bind(this);
    this.likeMessage = this.likeMessage.bind(this);
    this.reportMessage = this.reportMessage.bind(this);
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
        deleted: false,
      }
    );
  }

  /**
   * Likes the message in the chat
   * @param {Object} message - The message to be liked
   * @param {String} action - Whether to like or dislike the message (toggle)
   */
  likeMessage(message, action) {
    const { firestore, auth, groupId } = this.props;
    let deltaLikes = null;

    // decide what to change
    if (action === 'like') {
      deltaLikes = {
        [`likes.${auth.uid}`]: 1,
      };
    } else if (action === 'dislike') {
      deltaLikes = {
        [`likes.${auth.uid}`]: firestore.FieldValue.delete(),
      };
    }
    // send update
    firestore.update(`groups/${groupId}/messages/${message._id}`, deltaLikes);
  }

  /**
   * Reports the message in the chat
   * @param {Object} message - The message to be reported
   */
  reportMessage(message) {
    const { firestore, auth, groupId } = this.props;
    // Update the message to track who's reported it
    firestore.update(
      {
        collection: 'groups',
        doc: groupId,
        subcollections: [{ collection: 'messages', doc: message._id }],
      },
      {
        [`reporters.${auth.uid}`]: true,
      }
    );

    // Open a new report ticket
    firestore.add('reports', {
      type: 'Message',
      status: 'Pending Review',
      message: {
        _id: message._id,
        createdAt: message.createdAt,
        text: message.text,
        user: message.user,
      },
      groupId,
      reporterId: auth.uid,
      createdAt: Date.now(),
    });
  }

  render() {
    const { messages } = this.props;
    return (
      <View style={styles.container}>
        <Chat
          messages={messages}
          sendMessage={this.sendMessage}
          likeMessage={this.likeMessage}
          reportMessage={this.reportMessage}
        />
      </View>
    );
  }
}

export default Group;
