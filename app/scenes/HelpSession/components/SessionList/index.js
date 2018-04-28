import React from "react";
import Meteor from "react-native-meteor";
import { View, Text } from "react-native";
import { ListItem, Rating } from "react-native-elements";

import UserAvatar from "../../../../components/general/UserAvatar/index";
import { FullDateForSession } from "../../../../Helpers/Date";
import {
  CTextSubtitle,
  CText
} from "../../../../components/general/CustomText";
import List from "../../../../components/List/index";

import {
  GetOtherUsersNameForSession,
  IsSessionActive,
  GetOtherUsersIdForSession
} from "../../helpers";

import styles from "./styles";

export default class SessionList extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate("Show", params);
  }

  getCourseNameToDisplayForSession(session) {
    const course = Meteor.collection("courses").findOne(session.courseId);
    if (course) {
      return course.title1;
    }
    return "";
  }

  formatData() {
    const { sessions } = this.props;
    const formattedData = sessions.reduce((acc, session) => {
      let section = session.tutorId === Meteor.userId() ? "Received" : "Sent";
      // If the tutor has accepted, it is active
      if (session.tutorAccepted) {
        section = "Upcomming Sessions";
      }
      // If the session has ended
      if (session.endedAt) {
        section = "Previous Sessions";
      }
      const foundIndex = acc.findIndex(element => element.key === section);
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            key: section,
            data: [{ ...session }]
          }
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, { ...session }];
      return acc;
    }, []);
    // Return final data
    return formattedData;
  }

  renderItem(item) {
    const otherUsersName = GetOtherUsersNameForSession(item, Meteor.userId());
    const otherUsersId = GetOtherUsersIdForSession(item);
    var highlightedStyle = {};

    // Make sure the other users ID exists
    if (otherUsersId == null) {
      return <View />;
    }
    // Get the other users's profile pic URL
    const otherUserProfilePic = Meteor.collection("users").findOne({
      _id: otherUsersId
    }).profile.profilePic;
    // See if this was sent or received
    let prefix = "← ";
    if (item.studentId === Meteor.user()._id) {
      prefix = "→ ";
    }
    if (IsSessionActive(item)) {
      prefix = "";
    }
    // If there are notifications, highlight it
    if (
      item.notifications[Meteor.userId()] &&
      item.notifications[Meteor.userId()] > 0
    ) {
      highlightedStyle = styles.listItemHighlightedContainer;
    }
    return (
      <ListItem
        key={item._id}
        roundAvatar
        title={prefix + otherUsersName}
        subtitle={
          <View>
            <CTextSubtitle
              style={[styles.listSubTitle, styles.listSubTitleLarge]}
            >
              {this.getCourseNameToDisplayForSession(item)}
            </CTextSubtitle>
            <CTextSubtitle style={styles.listSubTitle}>
              {FullDateForSession(item)}
            </CTextSubtitle>
          </View>
        }
        avatar={<UserAvatar url={otherUserProfilePic} />}
        containerStyle={[styles.listItemContainer, highlightedStyle]}
        onPress={() =>
          this.onPress({
            session: item,
            otherUsersName
          })
        }
      />
    );
  }

  render() {
    const data = this.formatData();
    return (
      <List
        data={this.formatData()}
        renderItem={this.renderItem}
        noneMessage={this.props.noneMessage}
      />
    );
  }
}
