import React from "react";
import { View } from "react-native";
import Meteor, { createContainer } from "react-native-meteor";
import { GiftedChat } from "react-native-gifted-chat";
import { Divider } from "react-native-elements";

import {
  SendMessageToHelpSession,
  ClearUsersNotificationsForSession
} from "../../../Helpers/Meteor";
import { GetOtherUsersNameForSession } from "../../../scenes/HelpSession/helpers";
import { CalculateTimeAndCost } from "../../../Helpers/Session";
import ActivityIndicator from "../../../components/general/ActivityIndicator";

import RateUserView from "../components/RateUserView/index";
import SessionData from "../components/SessionData/index";

import styles from "./styles";

const timer = require("react-native-timer");

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date()
    };
  }

  componentDidMount() {
    this._mounted = true;
    // start timer for updating the current date every second
    const { session } = this.props;
    if (!session) {
      return;
    }
    if (!session.endedAt) {
      // start interval for counting time
      timer.setInterval(
        this,
        "updateCurrentDate",
        () => {
          if (this._mounted) {
            this.setState({
              now: new Date()
            });
          }
        },
        1000
      );
    } else {
      const endedAt = new Date(session.endedAt);
      // set current date to the end date
      this.setState({
        now: new Date(session.endedAt)
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    timer.clearInterval("updateCurrentDate");
  }

  // When a message is sent on client
  onSend(messages = []) {
    const { session } = this.props;
    const message = messages[0];
    message.user.name = Meteor.user().profile.name;
    SendMessageToHelpSession(session._id, message);
  }

  // When the end session button is pressed, stop the timer
  onPressEndSession() {
    timer.clearInterval(this);
  }

  // Update the now attribute of state to the current date/time
  updateCurrentDate() {
    this.setState({
      now: new Date()
    });
  }

  // Render the chat UI element
  renderChat(messages) {
    if (messages) {
      return (
        <GiftedChat
          messages={messages.reverse()}
          bottomOffset={50}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: Meteor.userId()
          }}
          renderLoading={() => (
            <ActivityIndicator size="large" marginTop={35} />
          )}
        />
      );
    }
    return <View />;
  }

  render() {
    const { session } = this.props;
    // get this user's rating for this session
    const myRating = Meteor.collection("ratings").findOne({
      userId: Meteor.userId(),
      sessionId: session._id
    });
    const sessionEndedAndUserHasntRated = session.endedAt && !myRating;

    // If there are notifications, clear them because we are viewing them
    if (session.notifications[Meteor.userId()] > 0) {
      ClearUsersNotificationsForSession(session);
    }

    return (
      <View style={styles.container}>
        {sessionEndedAndUserHasntRated ? null : (
          <SessionData
            session={session}
            now={this.state.now}
            onPressEndSession={this.onPressEndSession}
          />
        )}

        <Divider style={{ backgroundColor: "lightgray" }} />

        <View style={styles.chatContainer}>
          {sessionEndedAndUserHasntRated ? (
            <RateUserView
              session={session}
              timeAndCost={CalculateTimeAndCost(session, this.state.now)}
            />
          ) : (
            this.renderChat(session.messages)
          )}
        </View>
      </View>
    );
  }
}

const container = createContainer(params => {
  const { session } = params.navigation.state.params;
  // Subscribe to meteor collection
  Meteor.subscribe("session", { id: session._id });
  Meteor.subscribe("ratingsForSession", { id: session._id });
  return {
    session: Meteor.collection("helpSessions").findOne({ _id: session._id }),
    ratings: Meteor.collection("ratings").find()
  };
}, Show);

container.navigationOptions = ({ navigation }) => {
  const {
    state: { params = {} }
  } = navigation;
  return {
    headerTitle: params.otherUsersName || "Session"
  };
};

export default container;
