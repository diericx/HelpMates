import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GiftedChat } from 'react-native-gifted-chat';
import { Divider, Button } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  sessionDataContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sessionData: {},
  waitingText: {
    color: 'gray',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  waitingForTutor: {
    height: 65,
    justifyContent: 'center',
  },
  sideBySideButton: {
    width: 150,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '$green',
  },
  denyButton: {
    backgroundColor: '$red',
  },
  cancelButton: {
    backgroundColor: '$orange',
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
    this.renderSessionData = this.renderSessionData.bind(this);
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

  // METEOR - Deny this session
  denySession() {
    const sessionId = this.state.navParams.session._id;
    Meteor.call('helpSessions.deny', { sessionId }, (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      } else {
        console.log('Denied Session!');
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

  renderWaitingForTutorToAccept() {
    return (
      <View style={styles.waitingForTutor}>
        <ActivityIndicator size="large" color="lightblue" />
        <Text style={styles.waitingText}>
          {' '}
          Waiting for {this.state.navParams.otherUsersName} to accept your request{' '}
        </Text>
      </View>
    );
  }

  renderAcceptDenyButtons() {
    const session = this.props.session;
    return (
      <View style={styles.actionButtonsContainer}>
        <Button
          title="Accept"
          textStyle={{ fontWeight: '700' }}
          buttonStyle={[styles.sideBySideButton, styles.acceptButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={this.acceptSession}
        />
        <Button
          title="Deny"
          textStyle={{ fontWeight: '700' }}
          buttonStyle={[styles.sideBySideButton, styles.denyButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={this.denySession}
        />
      </View>
    );
  }

  renderStartCancelButtons() {
    const session = this.props.session;
    return (
      <View style={styles.actionButtonsContainer}>
        <Button
          title="Start"
          textStyle={{ fontWeight: '700' }}
          buttonStyle={[styles.sideBySideButton, styles.acceptButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={this.acceptSession}
        />
        <Button
          title="Cancel"
          textStyle={{ fontWeight: '700' }}
          buttonStyle={[styles.sideBySideButton, styles.cancelButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={this.denySession}
        />
      </View>
    );
  }

  renderSessionData() {
    const session = this.props.session;
    if (session.tutorId === Meteor.userId()) {
    } else if (session.tutorAccepted) {
      // if the tutor has accepted
      if (session.startedAt) {
        // show the active session view
      }
    } else {
      return this.renderWaitingForTutorToAccept();
    }
  }

  renderSessionDataActionButtons() {
    const session = this.props.session;
    if (session == null) {
      return <View />;
    }

    // if this is the tutor
    if (session.tutorId === Meteor.userId()) {
      // if the tutor has accepted
      if (session.tutorAccepted) {
        if (session.startedAt) {
          // show the active session view
        } else {
          // show the start and cancel buttons
          return this.renderStartCancelButtons();
        }
      }
      // if the tutor hasn't accepted, show the accept/deny buttons
      return this.renderAcceptDenyButtons();
    }

    // if this is the student
    if (session.tutorAccepted) {
      // if the tutor has accepted
      if (session.startedAt) {
        // show the active session view
      } else {
        // show the start and cancel buttons
        return this.renderStartCancelButtons();
      }
    }
  }

  render() {
    const { conversation } = this.props;
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.sessionDataContainer}>
          <View style={styles.sessionData}>{this.renderSessionData()}</View>
          {this.renderSessionDataActionButtons()}
        </View>
        <Divider style={{ backgroundColor: 'lightgray' }} />
        <View style={styles.chatContainer}>{this.renderChat(conversation)}</View>
      </View>
    );
  }
}

const container = createContainer((params) => {
  const session = params.navigation.state.params.session;
  Meteor.subscribe('session', { id: session._id });
  return {
    session: Meteor.collection('helpSessions').findOne(session._id),
    conversation: Meteor.collection('conversations').findOne(session.conversationId),
  };
}, Show);

container.navigationOptions = {
  title: '',
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

export default container;
