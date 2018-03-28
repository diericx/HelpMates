import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Meteor from 'react-native-meteor';

import { GetOtherUsersNameForSession } from 'app/scenes/HelpSession/helpers';
import { CalculateTimeAndCost, IsCurrentUserStudent } from 'app/Helpers/Session';
import SessionActionButtons from '../SessionActionButtons/index';

import styles from './styles';

export default class Index extends React.Component {
  // Render a message about the current session
  renderSessionWaitingMessage(preMessage, postMessage, showLoader) {
    const { session } = this.props;
    const otherUsersName = GetOtherUsersNameForSession(session);
    return (
      <View style={styles.sessionWaitingContainer}>
        {showLoader ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="lightblue" />
          </View>
        ) : (
          <View />
        )}
        <Text style={styles.sessionWaitingText}>
          {preMessage} {otherUsersName} {postMessage}
        </Text>
      </View>
    );
  }

  // Render the data for an active session
  renderActiveSessionData() {
    const { session, now } = this.props;
    const timeAndCost = CalculateTimeAndCost(session, now);
    return (
      <View>
        <Text style={styles.sessionLengthText}>
          {timeAndCost.hours}:{timeAndCost.minutes}:{timeAndCost.seconds}
        </Text>
        <Text style={styles.sessionCostText}>${timeAndCost.cost}</Text>
      </View>
    );
  }

  renderSessionData() {
    const { session } = this.props;
    const myRating = Meteor.collection('ratings').findOne({ userId: Meteor.userId() });
    const otherUsersName = GetOtherUsersNameForSession(session);
    if (session.endedAt) {
      if (myRating && IsCurrentUserStudent(session)) {
        return (
          <View style={styles.alertDataContainer}>
            <Text style={styles.sessionWaitingText}>
              You owe {otherUsersName} ${CalculateTimeAndCost(session, session.endedAt).cost} {'\n'}
              Venmo @Zac-Holland
            </Text>
          </View>
        );
      }
      return null;
    }

    // if the session has started
    if (session.startedAt) {
      return this.renderActiveSessionData();
    }

    // if this is the tutor
    if (session.tutorId === Meteor.userId()) {
      // if neither person has not started, just show the buttons
      if (!session.tutorStarted && !session.studentStarted) {
        return <View />;
      }
      // if the tutor has started but this student has not
      if (session.studentStarted && !session.tutorStarted) {
        return this.renderSessionWaitingMessage('', 'is waiting for you to start!', false);
      }
      // if this tutor has started but student has not
      if (session.tutorStarted && !session.studentStarted) {
        return this.renderSessionWaitingMessage('Waiting for ', 'to start the session', true);
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
        return this.renderSessionWaitingMessage('', 'is waiting for you to start!', false);
      }
      // if this student has started but tutor has not
      if (session.studentStarted && !session.tutorStarted) {
        return this.renderSessionWaitingMessage('Waiting for', 'to start the session', true);
      }
    }
    return this.renderSessionWaitingMessage('Waiting for', 'to accept your request', true);
  }

  render() {
    const { session } = this.props;
    const sessionEnded = session.endedAt == null;
    return (
      <View
        style={
          sessionEnded != null && IsCurrentUserStudent(session)
            ? [styles.sessionDataContainer, styles.alertSessionDataContainer]
            : styles.sessionDataContainer
        }
      >
        <View style={styles.sessionData}>{this.renderSessionData()}</View>
        <SessionActionButtons session={this.props.session} />
      </View>
    );
  }
}
