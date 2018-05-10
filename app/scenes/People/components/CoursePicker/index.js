import React from "react";
import { View, Text } from "react-native";
import Meteor from "react-native-meteor";
import EStyleSheet from "react-native-extended-stylesheet";
import { ListItem } from "react-native-elements";

import styles from "./styles";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }

  changeSelected(value) {
    this.setState({
      selected: value
    });
  }

  renderCourseList(courses) {
    console.log("Courses", courses);
    if (Object.keys(courses).length == 0) {
      return (
        <View>
          <Text style={styles.noneMessageText}>No Completed Courses</Text>
        </View>
      );
    }
    return Object.keys(courses).map((courseId, index) => {
      const courseName = Meteor.collection("courses").findOne({ _id: courseId })
        .title1;
      return (
        <ListItem
          key={index}
          roundAvatar
          title={courseName}
          containerStyle={styles.listItemContainer}
          onPress={() => this.props.onSelectCourse(courseId)}
        />
      );
    });
  }

  render() {
    const { courses } = this.props;
    return <View>{this.renderCourseList(courses)}</View>;
  }
}
