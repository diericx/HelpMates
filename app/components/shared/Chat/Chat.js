import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { ChatEngine } from '../../../lib/PubNub';

import SlackMessage from './SlackMessage';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // backgroundColor: '$lightgray',
  },
});

@connect(({ firebase, testObject }) => ({
  auth: firebase.auth,
  profile: firebase.profile,
  testObject,
}))
class Chat extends React.Component {
  state = {
    chat: null,
  };

  constructor() {
    super();
    // bind
    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    const { profile, auth } = this.props;
    if (profile == null || auth == null) {
      console.error('Couldnt initialize chat because profile or auth is null!');
    }

    ChatEngine.connect(
      auth.uid,
      profile
    );

    ChatEngine.on('$.ready', data => {
      const me = data.me;
      const chat = new ChatEngine.Chat('MyChat');

      this.setState({ chat, me });
    });

    // ChatEngine.on('$.ready', data => {
    //   // // store my user as me
    //   // const { me } = data;
    //   // create a new ChatEngine chat room
    //   const myChat = new ChatEngine.Chat('demo-room');
    //   // connect to the chat room
    //   myChat.on('$.connected', () => {
    //     console.log('The chat is connected!');
    //     // when we receive messages in this chat, render them
    //     myChat.on('message', message => {
    //       console.log('Incoming Message: ', message);
    //     });
    //     // // send a message to everyone in the chat room
    //     // myChat.emit('message', {
    //     //   text: 'Hi Everyone!',
    //     // });
    //   });
    // });
  }

  renderMessage = props => {
    // parse data from class props
    const { profile } = this.props;

    return <SlackMessage {...props} {...this.props} profile={profile} />;
  };

  render() {
    const { messages, auth, profile } = this.props;
    console.log(this.state.chat);
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

Chat.propTypes = {
  messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  sendMessage: PropTypes.func,
};

Chat.defaultProps = {
  messages: null,
  sendMessage: () => console.error('Chat.sendMessage() is null and was never passed in as a prop'),
};

export default Chat;
