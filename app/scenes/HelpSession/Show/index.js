import React from 'react';
import { View } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { GiftedChat } from 'react-native-gifted-chat';
import { Divider } from 'react-native-elements';

import { SendMessage } from 'app/Helpers/Meteor';
import { GetOtherUsersNameForSession } from 'app/scenes/HelpSession/helpers';
import { CalculateTimeAndCost } from 'app/Helpers/Session';

import RateUserView from '../components/RateUserView/index';
import SessionData from '../components/SessionData/index';

import styles from './styles';

const timer = require('react-native-timer');

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
    };
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

  // Update the now attribute of state to the current date/time
  updateCurrentDate() {
    this.setState({
      now: new Date(),
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

  render() {
    const { conversation } = this.props;
    const { session } = this.props;
    const myRating = Meteor.collection('ratings').findOne({ userId: Meteor.userId() });
    if (session.endedAt && !myRating) {
      return (
        <RateUserView
          session={session}
          timeAndCost={CalculateTimeAndCost(session, this.state.now)}
        />
      );
    }

    return (
      <View style={styles.container}>
        <SessionData session={session} now={this.state.now} />

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
  Meteor.subscribe('ratingsForSession', { id: session._id });
  return {
    session: Meteor.collection('helpSessions').findOne(session._id),
    conversation: Meteor.collection('conversations').findOne(session.conversationId),
    ratings: Meteor.collection('ratings').find(),
  };
}, Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    title: params.otherUsersName || 'Session',
  };
};

export default container;
