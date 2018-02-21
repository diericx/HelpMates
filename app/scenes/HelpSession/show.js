import React from 'react';
import { View, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = EStyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

class Show extends React.Component {
  // When a message is sent on client
  onSend(convoId, messages = []) {
    const message = messages[0];
    message.user.name = Meteor.user().profile.name;
    this.sendMessage(convoId, message);
  }

  // Send the message to the server
  sendMessage(conversationId, message) {
    Meteor.call('conversations.sendMessage', { conversationId, message }, (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      } else {
        console.log('Sent Message!');
      }
    });
  }

  // Render the chat UI element
  renderChat(conversation) {
    console.log('Conve: ', conversation);
    if (conversation) {
      console.log('conversation is here');
      return (
        <GiftedChat
          messages={conversation.messages.reverse()}
          bottomOffset={50}
          onSend={messages => this.onSend(conversation._id, messages)}
          user={{
            _id: Meteor.userId(),
          }}
        />
      );
    }
    return <View />;
  }

  render() {
    const { conversation } = this.props;
    return <View style={styles.container}>{this.renderChat(conversation)}</View>;
  }
}

export default (container = createContainer((params) => {
  const convoId = params.navigation.state.params.conversationId;
  Meteor.subscribe('thisConversation', { id: convoId });
  return {
    conversation: Meteor.collection('conversations').findOne(convoId),
  };
}, Show));

container.navigationOptions = {
  title: 'Session',
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
