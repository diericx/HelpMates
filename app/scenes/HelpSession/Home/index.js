import React from "react";
import { View, Text, ScrollView } from "react-native";
import Meteor, { createContainer } from "react-native-meteor";
import { Card, Divider } from "react-native-elements";

import SessionList from "../components/SessionList/index";

import styles from "./styles";

class Index extends React.Component {
  onItemPress(params) {
    this.props.navigation.navigate("Show", params);
  }

  render() {
    const { sessionRequests } = this.props;
    const { sessions } = this.props;
    if (sessionRequests == null || sessions == null) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        <SessionList
          sessions={sessionRequests}
          noneMessage="Try lowering your prices a bit."
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const container = createContainer(params => {
  // subscribe to meteor collections
  Meteor.subscribe("mySessions");
  return {
    sessionRequests: Meteor.collection("helpSessions").find(),
    sessions: Meteor.collection("helpSessions").find({ tutorAccepted: true })
  };
}, Index);

export default container;
