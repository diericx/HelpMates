import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  firestoreConnect,
  isLoaded,
  isEmpty,
  withFirestore,
  withFirebase,
} from 'react-redux-firebase';
import Chat from '../../components/shared/Chat/Chat';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

@compose(
  // Connect first to feed auth into firestoreConnect
  connect(({ firebase: { auth } }) => ({
    auth,
  })),
  // Now that we have auth, use the UID
  firestoreConnect(({ auth }) => [
    {
      collection: 'feedback',
      doc: auth.uid,
      subcollections: [{ collection: 'messages' }],
      storeAs: 'feedbackChatMessages',
    },
  ]),
  // Setup final props
  connect(({ firestore }, { auth }) => ({
    messages: firestore.data.feedbackChatMessages,
    auth,
  })),
  withFirestore
)
class FeedbackChat extends React.Component {
  constructor() {
    super();
    // bind
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const { firestore, auth } = this.props;
    // If the feedback chat doesn't exist, let's create it!
    firestore
      .doc(`feedback/${auth.uid}`)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          this.createFeedbackChat();
        }
      });
  }

  // Create the document for this user's feedback data
  createFeedbackChat() {
    const { firestore, auth } = this.props;
    // const { firestore, auth } = this.props;
    firestore
      .collection('feedback')
      .doc(auth.uid)
      .set(
        {
          lastMessage: null,
        },
        { merge: true }
      );
  }

  /**
   * Sends a message to the feedback chat for this user
   * @param {Object} message - The message to be sent
   */
  sendMessage(message) {
    const { firestore, auth } = this.props;
    firestore.add(
      {
        collection: 'feedback',
        doc: auth.uid,
        subcollections: [{ collection: 'messages' }],
      },
      {
        ...message,
      }
    );
  }

  render() {
    let { messages } = this.props;

    // if (!isLoaded(chat)) {
    //   return <ActivityIndicator size="large" />;
    // }

    // If the chat is empty (as in no one has said started it) pretend that it exits
    //  by artificially creating an object for it here. Once someone sends a message
    //  the object will be populated.
    if (messages == null) {
      messages = {};
    }

    return (
      <View style={styles.container}>
        <Chat messages={messages} sendMessage={this.sendMessage} />
      </View>
    );
  }
}

export default FeedbackChat;
