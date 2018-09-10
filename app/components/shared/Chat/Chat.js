import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';

import Message from './Message';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // backgroundColor: '$lightgray',
  },
});

@connect(({ firebase }) => ({
  auth: firebase.auth,
  profile: firebase.profile,
}))
class Chat extends React.Component {
  constructor() {
    super();
    // bind
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage = props => {
    // parse data from class props
    const { reportMessage, likeMessage, auth } = this.props;

    return <Message {...props} {...{ reportMessage, likeMessage, auth }} />;
  };

  render() {
    // get variable props
    const { messages, auth, profile } = this.props;
    // get function props
    const { sendMessage } = this.props;

    let formattedMessages = null;

    if (!isLoaded(messages)) {
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
          messages={formattedMessages == null ? [] : formattedMessages.reverse()}
          renderMessage={this.renderMessage}
          onSend={messagesToSend => {
            const message = messagesToSend[0];
            delete message._id;
            sendMessage(message);
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

Chat.propTypes = {
  messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  sendMessage: PropTypes.func,
};

Chat.defaultProps = {
  messages: null,
  sendMessage: () => console.error('Chat.sendMessage() is null and was never passed in as a prop'),
};

export default Chat;
