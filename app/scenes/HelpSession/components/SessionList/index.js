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
        section = "Active Session";
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
    // Sort the sections
    const sortedData = formattedData.sort(function(a, b) {
      if (a.section == "Active Sessions") {
        return 1;
      }
      if (a.section == "Received") {
        return 1;
      }
      return -1;
    });
    // Return final data
    return sortedData;
  }

  renderItem(item) {
    const otherUsersName = GetOtherUsersNameForSession(item, Meteor.userId());
    const otherUsersId = GetOtherUsersIdForSession(item);
    if (otherUsersId == null) {
      return <View />;
    }
    const otherUserProfilePic = Meteor.collection("users").findOne({
      _id: otherUsersId
    }).profile.profilePic;

    let prefix = "To ";
    if (item.studentId === Meteor.user()._id) {
      prefix = "From ";
    }
    if (IsSessionActive(item)) {
      prefix = "";
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
        containerStyle={styles.listItemContainer}
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
    const { sessions } = this.props;
    if (!sessions || sessions.length === 0) {
      return (
        <View>
          <Text style={styles.noneMessageText}> {this.props.noneMessage} </Text>
        </View>
      );
    }
    const data = this.formatData();
    return <List data={this.formatData()} renderItem={this.renderItem} />;
  }
}
