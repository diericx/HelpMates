import React from 'react';
import { View, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GiftedChat } from 'react-native-gifted-chat';
import { Divider, Button } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  sessionDataContainer: {
    height: '25%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionData: {
    flex: 1,
  },
  sessionDataActionButtons: {
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: '$green',
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  chatContainer: {
    flex: 1,
  },
});

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navParams: this.props.navigation.state.params,
    };
    // bind
    this.acceptSession = this.acceptSession.bind(this);
    this.renderSessionDataActionButtons = this.renderSessionDataActionButtons.bind(this);
  }

  // When a message is sent on client
  onSend(convoId, messages = []) {
    const message = messages[0];
    message.user.name = Meteor.user().profile.name;
    this.sendMessage(convoId, message);
  }

  // METEOR - Send the message to the server
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

  // METEOR - Accept this session
  acceptSession() {
    const sessionId = this.state.navParams.session._id;
    Meteor.call('helpSessions.accept', { sessionId }, (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      } else {
        console.log('Accepted Session!');
      }
    });
  }

  // Render the chat UI element
  renderChat(conversation) {
    if (conversation) {
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

  renderSessionDataActionButtons() {
    const session = this.state.navParams.session;
    if (session.tutorId === Meteor.userId()) {
      if (session.tutorId === Meteor.userId()) {
        return (
          <Button
            title="Accept"
            textStyle={{ fontWeight: '700' }}
            buttonStyle={styles.acceptButton}
            containerStyle={{ marginTop: 20 }}
            onPress={this.acceptSession}
          />
        );
      }
    }
  }

  render() {
    const { conversation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.sessionDataContainer}>
          <View style={styles.sessionData} />
          <View style={styles.sessionDataActionButtons}>
            {this.renderSessionDataActionButtons()}
          </View>
        </View>
        <Divider style={{ backgroundColor: 'lightgray' }} />
        <View style={styles.chatContainer}>{this.renderChat(conversation)}</View>
      </View>
    );
  }
}

export default (container = createContainer((params) => {
  const convoId = params.navigation.state.params.session.conversationId;
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
