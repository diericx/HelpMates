import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import emojiUtils from 'emoji-utils';

import SlackMessage from './SlackMessage';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // backgroundColor: '$lightgray',
  },
});

@compose(
  firestoreConnect(({ groupId }) => [
    {
      collection: 'groups',
      doc: groupId,
      orderBy: ['createdAt'],
      subcollections: [{ collection: 'messages' }],
      storeAs: `messages-${groupId}`,
    },
  ]),
  connect(({ firestore: { data }, firebase }, { groupId }) => ({
    group: data.groups[groupId],
    messages: data[`messages-${groupId}`],
    auth: firebase.auth,
    profile: firebase.profile,
  }))
)
export default class Chat extends React.Component {
  sendMessage(message) {
    const { firestore, groupId } = this.props;
    firestore.add(
      {
        collection: 'groups',
        doc: groupId,
        subcollections: [{ collection: 'messages' }],
      },
      message
    );
  }

  renderMessage = props => {
    const {
      currentMessage: { text: currText },
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  };

  render() {
    const { group, messages, auth, profile } = this.props;
    let formattedMessages = null;

    if (!isLoaded(group) || !isLoaded(messages)) {
      return <ActivityIndicator />;
    }

    if (!isEmpty(messages)) {
      // Format the messages from an object to an array and also handle some
      //  object inequalities.
      formattedMessages = Object.keys(messages).map(key => {
        const message = messages[key];
        // If createdAt was sent from Firestore, it is a Timestamp object
        //  so we need to convert it to a js date.
        if (message.createdAt && message.createdAt.toDate) {
          message.createdAt = message.createdAt.toDate();
        }
        return {
          _id: key,
          ...message,
        };
      });
    }

    return (
      <View style={styles.container}>
        <GiftedChat
          bottomOffset={45}
          renderLoading={() => <ActivityIndicator />}
          messages={formattedMessages == null ? messages : formattedMessages.reverse()}
          renderMessage={this.renderMessage}
          onSend={messagesToSend => {
            const message = messagesToSend[0];
            delete message._id;
            this.sendMessage(message);
          }}
          user={{
            _id: auth.uid,
            name: profile.name,
            avatar: profile.avatar,
          }}
        />
      </View>
    );
  }
}
