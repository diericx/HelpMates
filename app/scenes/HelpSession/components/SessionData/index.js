import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Clipboard,
  TouchableOpacity,
  Alert
} from "react-native";
import Meteor from "react-native-meteor";

import {
  GetOtherUsersNameForSession,
  GetOtherUserForSession
} from "../../../../scenes/HelpSession/helpers";
import {
  CalculateTimeAndCost,
  IsCurrentUserStudent
} from "../../../../Helpers/Session";
import SessionActionButtons from "../SessionActionButtons/index";

import styles from "./styles";

export default class Index extends React.Component {
  async onCopyVenmoHandleButton(handle) {
    await Clipboard.setString(handle);
  }

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
    const myRating = Meteor.collection("ratings").findOne({
      userId: Meteor.userId()
    });
    const otherUser = GetOtherUserForSession(session);
    const otherUsersName = otherUser.profile.name;
    if (session.endedAt && session.hasStudentPayed) {
      return null;
    }
    // if the session has ended and student hasn't payed, show the payment alert message
    if (session.endedAt && !session.hasStudentPayed) {
      if (IsCurrentUserStudent(session)) {
        // Show alert for student
        return (
          <TouchableOpacity
            onPress={() => {
              this.onCopyVenmoHandleButton(otherUser.profile.venmoHandle);
              Alert.alert(
                "Venmo handle copied",
                "",
                [
                  {
                    text: "Thanks!",
                    onPress: () => console.log("Thanks")
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={[styles.sessionWaitingText, styles.alertText]}>
              You owe {otherUsersName} ${
                CalculateTimeAndCost(session, session.endedAt).cost
              }{" "}
              {"\n"}
              Tap to copy Venmo handle: {otherUser.profile.venmoHandle}
            </Text>
          </TouchableOpacity>
        );
      } else {
        // Show alert for tutor
        return (
          <View>
            <Text style={[styles.sessionWaitingText, styles.alertText]}>
              {otherUsersName} owes you ${
                CalculateTimeAndCost(session, session.endedAt).cost
              }
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
        return this.renderSessionWaitingMessage(
          "",
          "is waiting for you to start!",
          false
        );
      }
      // if this tutor has started but student has not
      if (session.tutorStarted && !session.studentStarted) {
        return this.renderSessionWaitingMessage(
          "Waiting for ",
          "to start the session",
          true
        );
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
        return this.renderSessionWaitingMessage(
          "",
          "is waiting for you to start!",
          false
        );
      }
      // if this student has started but tutor has not
      if (session.studentStarted && !session.tutorStarted) {
        return this.renderSessionWaitingMessage(
          "Waiting for",
          "to start the session",
          true
        );
      }
    }
    return this.renderSessionWaitingMessage(
      "Waiting for",
      "to accept your request",
      true
    );
  }

  render() {
    const { session } = this.props;
    return (
      <View
        style={
          session.endedAt != null
            ? IsCurrentUserStudent(session)
              ? [styles.sessionDataContainer, styles.alertSessionDataContainer]
              : [
                  styles.sessionDataContainer,
                  styles.alertSessionDataContainer,
                  styles.redAlertContainer
                ]
            : styles.sessionDataContainer
        }
      >
        <View style={styles.sessionData}>{this.renderSessionData()}</View>
        <SessionActionButtons
          session={session}
          onPressEndSession={this.props.onPressEndSession}
        />
      </View>
    );
  }
}
