import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Meteor from "react-native-meteor";

import {
  AcceptSession,
  DenySession,
  StartSesson,
  EndSession
} from "../../../../Helpers/Meteor";
import { HasCurrentUserEnded } from "../../../../scenes/HelpSession/helpers";

import RateUserView from "../../components/RateUserView/index";
import SessionData from "../../components/SessionData/index";

import styles from "./styles";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    //bind
    this.onPressEndSession = this.onPressEndSession.bind(this);
  }
  // When the End Session button is pressed, send the message to meteor and
  // end the timer
  onPressEndSession() {
    // Send meteor message
    EndSession(session);
    // End timer
    this.props.onPressEndSession();
  }

  renderAcceptDenyButtons() {
    const { session } = this.props;
    return (
      <View style={styles.actionButtonsContainer}>
        <Button
          title="Accept"
          textStyle={{ fontWeight: "700" }}
          buttonStyle={[styles.sideBySideButton, styles.acceptButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={() => AcceptSession(session)}
        />
        <Button
          title="Deny"
          textStyle={{ fontWeight: "700" }}
          buttonStyle={[styles.sideBySideButton, styles.denyButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={() => DenySession(session)}
        />
      </View>
    );
  }

  renderStartCancelButtons() {
    const { session } = this.props;
    return (
      <View style={styles.actionButtonsContainer}>
        <Button
          title="Start"
          textStyle={{ fontWeight: "700" }}
          buttonStyle={[styles.sideBySideButton, styles.acceptButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={() => StartSesson(session)}
        />
        <Button
          title="Cancel"
          textStyle={{ fontWeight: "700" }}
          buttonStyle={[styles.sideBySideButton, styles.cancelButton]}
          containerStyle={{ marginTop: 20 }}
          onPress={() => DenySession(session)}
        />
      </View>
    );
  }

  renderEndButton() {
    const { session } = this.props;
    const currentUserId = Meteor.userId();
    let title = "End";
    let loading = false;
    let disabled = false;

    if (HasCurrentUserEnded(session)) {
      title = "";
      loading = true;
      disabled = true;
    }
    return (
      <View style={styles.actionButtonsContainer}>
        <Button
          title={title}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={styles.endButton}
          onPress={this.onPressEndSession}
          loading={loading}
          disabled={disabled}
        />
      </View>
    );
  }

  renderSessionActionButtons() {
    const session = this.props.session;
    const myRating = Meteor.collection("ratings").findOne({
      userId: Meteor.userId()
    });

    if (session == null || session.endedAt) {
      return <View />;
    }

    // if the session has started
    if (session.startedAt) {
      return this.renderEndButton(session);
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
    return <View>{this.renderSessionActionButtons()}</View>;
  }
}
