import React from "react";
import Meteor, { createContainer } from "react-native-meteor";
import { View, FlatList, Button } from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";

import List from "../../../components/List/index";

import styles from "./styles";

class Index extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.renderItem = this.renderItem.bind(this);
    // this.onAddCourseButtonPress = this.onAddCourseButtonPress.bind(this);
  }

  // When a course row is pressed from the course list,
  // transition to the show course screen.
  onCoursePress(params) {
    this.props.navigation.navigate("EditCompletedCourse", params);
  }

  formatData() {
    const { completedCourses } = Meteor.user().profile;
    const completedCourseKeys = Object.keys(completedCourses);
    const courses = this.props.courses;

    return [{ data: courses, key: "NONE" }];
  }

  renderItem(item) {
    const { completedCourses } = Meteor.user().profile;
    const completedCourseRate = completedCourses[item._id];
    return (
      <ListItem
        containerStyle={styles.listItemContainer}
        title={item.title1}
        subtitle={`$${completedCourseRate}/hr`}
        onPress={() =>
          this.onCoursePress({
            course: item
          })
        }
      />
    );
  }

  render() {
    const { completedCourses } = Meteor.user().profile;

    // if the data is here and ready, load the list
    return (
      <View style={styles.container}>
        <List
          data={this.formatData(completedCourses)}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const container = createContainer(params => {
  // subscribe to meteor collections
  const handle = Meteor.subscribe("myCourses");
  const courseIds = Object.keys(Meteor.user().profile.completedCourses);
  return {
    courses: Meteor.collection("courses").find({ _id: { $in: courseIds } })
  };
}, Index);

container.navigationOptions = ({ navigation }) => ({
  headerTitle: "My Courses",
  headerRight: (
    <Icon
      iconStyle={{ marginRight: 0, marginTop: 8 }}
      name="plus"
      type="entypo"
      color="white"
      size={38}
      onPress={() => navigation.navigate("SelectCourseModal")}
    />
  )
});

export default container;
