import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GiftedChat } from 'react-native-gifted-chat';
import { Divider, Button, Rating } from 'react-native-elements';

import { SendMessage } from '../../Helpers/Meteor';

const timer = require('react-native-timer');

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
  activityIndicatorContainer: {
    paddingVertical: 10,
  },
  otherUserMessageText: {
    color: 'gray',
    paddingVertical: 5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  otherUserMessageContainer: {
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
  sessionLengthText: {
    fontFamily: 'OpenSansLight',
    color: '$offBlack',
    fontSize: 40,
  },
  sessionCostText: {
    fontFamily: 'OpenSansLight',
    color: '$offBlack',
    textAlign: 'center',
    fontSize: 25,
  },
  endButton: {
    height: 45,
    backgroundColor: '$green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    width: '$screenWidth - 50',
    marginBottom: 10,
  },
});

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navParams: this.props.navigation.state.params,
      updateEverySecond: false,
      now: new Date(),
    };

    // bind
    this.acceptSession = this.acceptSession.bind(this);
    this.startSesson = this.startSesson.bind(this);
    this.endSession = this.endSession(this);
    this.renderSessionDataActionButtons = this.renderSessionDataActionButtons.bind(this);
    this.renderSessionData = this.renderSessionData.bind(this);
    this.renderEndButton = this.renderEndButton.bind(this);
  }

  componentWillMount() {
    // start timer for updating the current date every second
    const { session } = this.props;
    if (!session.endedAt) {
      // start interval for counting time
      timer.setInterval(
        this,
        'updateCurrentDate',
        () => {
          this.setState({
            now: new Date(),
          });
        },
        1000,
      );
    } else {
      const endedAt = new Date(session.endedAt);
      console.log(session.endedAt);
      console.log(session.startedAt);
      // set current date to the end date
      this.setState({
        now: new Date(session.endedAt),
      });
    }
  }

  componentWillUnmount() {
    timer.clearInterval(this);
  }

  // When a message is sent on client
  onSend(convoId, messages = []) {
    const message = messages[0];
    message.user.name = Meteor.user().profile.name;
    SendMessage(convoId, message);
  }

  updateCurrentDate() {
    this.setState({
      now: new Date(),
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

  // METEOR - Start this session
  startSesson() {
    const sessionId = this.state.navParams.session._id;
    Meteor.call('helpSessions.start', { sessionId }, (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      } else {
        console.log('Started Session!');
      }
    });
  }

  // METEOR - Start this session
  endSession() {
    const sessionId = this.state.navParams.session._id;
    Meteor.call('helpSessions.end', { sessionId }, (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      } else {
        console.log('Ended Session!');
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

  renderOtherUserMessage(preMessage, postMessage, showLoader) {
    return (
      <View style={styles.otherUserMessageContainer}>
        {showLoader ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="lightblue" />
          </View>
        ) : (
          <View />
        )}
        <Text style={styles.otherUserMessageText}>
          {preMessage} {this.state.navParams.otherUsersName} {postMessage}
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
          onPress={this.startSesson}
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

  renderEndButton() {
    return (
      <View style={styles.actionButtonsContainer}>
        <Button
          title="End"
          textStyle={{ fontWeight: '700' }}
          buttonStyle={styles.endButton}
          onPress={this.endSession}
        />
      </View>
    );
  }

  renderRateButtons() {
    return (
      <View>
        <Rating imageSize={40} startingValue={0} />
      </View>
    );
  }

  renderActiveSessionData(session) {
    const diff = this.state.now.getTime() - session.startedAt.getTime();
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    minutes %= 60;
    seconds %= 60;
    const cost = ((hours + minutes / 60 + seconds / 3600) * session.cost).toFixed(2);
    return (
      <View>
        <Text style={styles.sessionLengthText}>
          {hours}:{minutes}:{seconds}
        </Text>
        <Text style={styles.sessionCostText}>${cost}</Text>
      </View>
    );
  }

  renderSessionData() {
    const session = this.props.session;

    // if the session has started
    if (session.startedAt) {
      return this.renderActiveSessionData(session);
    }

    // if this is the tutor
    if (session.tutorId === Meteor.userId()) {
      // if neither person has not started, just show the buttons
      if (!session.tutorStarted && !session.studentStarted) {
        return <View />;
      }
      // if the tutor has started but this student has not
      if (session.studentStarted && !session.tutorStarted) {
        return this.renderOtherUserMessage('', 'is waiting for you to start!', false);
      }
      // if this tutor has started but student has not
      if (session.tutorStarted && !session.studentStarted) {
        return this.renderOtherUserMessage('Waiting for ', 'to start the session', true);
      }
    }

    // if this is the student
    if (session.tutorAccepted) {
      // if neither person has not started, just show the buttons
      if (!session.tutorStarted && !session.studentStarted) {
        return <View />;
      }
      // if the tutor has started but this student has not
      if (session.tutorStarted && !session.studentStarted) {
        return this.renderOtherUserMessage('', 'is waiting for you to start!', false);
      }
      // if this student has started but tutor has not
      if (session.studentStarted && !session.tutorStarted) {
        return this.renderOtherUserMessage('Waiting for', 'to start the session', true);
      }
    }
    return this.renderOtherUserMessage('Waiting for', 'to accept your request', true);
  }

  renderSessionDataActionButtons() {
    const session = this.props.session;
    if (session == null) {
      return <View />;
    }

    // if the session has ended
    if (session.endedAt) {
      return this.renderRateButtons();
    }

    // if the session has started
    if (session.startedAt) {
      return this.renderEndButton();
    }

    // if this is the tutor
    if (session.tutorId === Meteor.userId()) {
      // if the tutor has accepted
      if (session.tutorAccepted) {
        // if this tutor has started but student has not
        if (session.tutorStarted && !session.studentStarted) {
          // show nothing
          return <View />;
        }
        // if the no one has started the session
        // show the start and cancel buttons
        return this.renderStartCancelButtons();
      }
      // if the tutor hasn't accepted, show the accept/deny buttons
      return this.renderAcceptDenyButtons();
    }

    // if this is the student
    if (session.studentId === Meteor.userId()) {
      // if this student has accepted
      if (session.tutorAccepted) {
        // if this student has started but tutor has not
        if (session.studentStarted && !session.tutorStarted) {
          // show nothing
          return <View />;
        }
        // if the session has started
        if (session.startedAt) {
          return <View />;
        }
        // if the no one has started the session
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
  const { session } = params.navigation.state.params;
  // Subscribe to meteor collection
  Meteor.subscribe('session', { id: session._id });
  return {
    session: Meteor.collection('helpSessions').findOne(session._id),
    conversation: Meteor.collection('conversations').findOne(session.conversationId),
  };
}, Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    title: params.otherUsersName || 'Session',
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
};

export default container;
