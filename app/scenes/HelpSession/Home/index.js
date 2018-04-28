import React from "react";
import { View, Text, ScrollView } from "react-native";
import Meteor, { createContainer } from "react-native-meteor";
import { Card, Divider, ButtonGroup } from "react-native-elements";
import IconBadge from "react-native-icon-badge";

import SessionList from "../components/SessionList/index";
import BGButton from "../components/BGButton/index";

import styles from "./styles";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: 0
    };

    // bind
    this.updateGroup = this.updateGroup.bind(this);
  }

  updateGroup(selectedGroup) {
    this.setState({ selectedGroup });
  }

  onItemPress(params) {
    this.props.navigation.navigate("Show", params);
  }

  sortSessionsByDate(sessions) {
    // Sort the sections
    const sortedSessions = sessions.sort(function(a, b) {
      if (a.startDate < b.startDate) {
        return -1;
      }
      if (a.section > b.startDate) {
        return 1;
      }
      return 0;
    });
    return sortedSessions;
  }

  // sortSessionsByNotifications(sessions) {
  //   // Sort the sections
  //   const sortedSessions = sessions.sort(function(a, b) {
  //     const notifA = a.notifications[Meteor.userId()]
  //     const notifB = b.notifications[Meteor.userId()]
  //     if (a.startDate < b.startDate) {
  //       return -1;
  //     }
  //     if (a.section > b.startDate) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   return sortedSessions;
  // }

  renderSessionListForSelectedGroup(sessions, sessionRequests, endedSessions) {
    const { selectedGroup } = this.state;
    if (selectedGroup == 0) {
      return (
        <SessionList
          sessions={this.sortSessionsByDate(sessions)}
          noneMessage="You don't have any active sessions."
          navigation={this.props.navigation}
        />
      );
    } else if (selectedGroup == 1) {
      return (
        <SessionList
          sessions={sessionRequests.reverse()}
          noneMessage="You don't have any requests. Try lowering your prices!"
          navigation={this.props.navigation}
        />
      );
    } else if (selectedGroup == 2) {
      return (
        <SessionList
          sessions={endedSessions}
          noneMessage="You haven't had any sessions recently."
          navigation={this.props.navigation}
        />
      );
    }
  }

  render() {
    const { selectedGroup } = this.state;
    const {
      sessions,
      sessionRequests,
      endedSessions,
      notificationLocation,
      requestsWithNotifications
    } = this.props;
    const { notifications } = this.props.screenProps;

    console.log(notifications.Sessions.sessions);

    const groupButtons = [
      {
        element: () => (
          <BGButton
            text={"Sessions"}
            highlighted={notifications.Sessions.sessions > 0}
          />
        )
      },
      {
        element: () => (
          <BGButton
            text={"Requests"}
            highlighted={notifications.Sessions.requests > 0}
          />
        )
      },
      {
        element: () => (
          <BGButton
            text={"History"}
            highlighted={notifications.Sessions.history > 0}
          />
        )
      }
    ];

    console.log(notifications);

    if (sessionRequests == null || sessions == null) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            onPress={this.updateGroup}
            selectedIndex={selectedGroup}
            buttons={groupButtons}
            containerStyle={styles.buttonGroup}
          />
        </View>

        <Divider style={styles.divider} />

        {this.renderSessionListForSelectedGroup(
          sessions,
          sessionRequests,
          endedSessions
        )}
      </View>
    );
  }
}

const container = createContainer(params => {
  // subscribe to myHelpSessions is in main index
  return {
    sessionRequests: Meteor.collection("helpSessions").find({
      tutorAccepted: false
    }),
    sessions: Meteor.collection("helpSessions").find({
      tutorAccepted: true,
      endedAt: { $exists: false }
    }),
    endedSessions: Meteor.collection("helpSessions").find({
      endedAt: { $exists: true }
    })
  };
}, Index);

export default container;
