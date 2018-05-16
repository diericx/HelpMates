import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import Meteor, { createContainer } from "react-native-meteor";

import { AddCompletedCourse } from "../../../Helpers/Meteor";

import CourseList from "../../../components/CourseList/index";
import SearchBar from "../../../components/SearchBar/index";

import styles from "./styles";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    // bind
    this.onSearchChangeText = this.onSearchChangeText.bind(this);
    this.onCoursePress = this.onCoursePress.bind(this);
  }

  // Set onChangeText in nav params so tab bar can see it
  componentDidMount() {
    this.props.navigation.setParams({
      onChangeText: this.onSearchChangeText
    });
  }

  // update states text variable when the search text changes
  onSearchChangeText(text) {
    this.setState({
      searchText: text
    });
  }

  // When a course row is pressed from the course list,
  // transition to the show course screen.
  onCoursePress(params) {
    AddCompletedCourse(params.course._id);
    this.props.navigation.goBack(null);
  }

  // Filter the course data using the search input
  filterCourses(courses) {
    return courses.filter(course => {
      const filter = this.state.searchText.toLowerCase();
      const title1 = course.title1.toLowerCase();
      const title2 = course.title2.toLowerCase();
      if (title1.indexOf(filter) != -1 || title2.indexOf(filter) != -1) {
        return true;
      }
      return false;
    });
  }

  render() {
    const { courses, coursesReady } = this.props;
    const filteredCourses = this.filterCourses(courses);

    // if the data isn't here yet, render activityIndicator
    if (!coursesReady) {
      return <ActivityIndicator animating size="large" />;
    }

    // if the data is here and ready, load the list
    return (
      <View style={styles.container}>
        <CourseList
          courses={filteredCourses}
          filter={this.state.searchText}
          navigation={this.props.navigation}
          onPress={this.onCoursePress}
          hideChevron
        />
      </View>
    );
  }
}

const container = createContainer(params => {
  const handle = Meteor.subscribe("courses");
  const completedCourseIds = Object.keys(
    Meteor.user().profile.completedCourses
  );
  return {
    coursesReady: handle.ready(),
    courses: Meteor.collection("courses").find({
      _id: { $not: { $in: completedCourseIds } }
    })
  };
}, Index);

container.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;

  return {
    // header: null,
    headerTitle: (
      <View style={styles.headerTitleContainer}>
        <Icon
          iconStyle={styles.headerTitleIcon}
          name="cross"
          type="entypo"
          color="white"
          size={45}
          onPress={() => navigation.goBack(null)}
        />
        <SearchBar
          placeholder="Search for a course"
          onChangeText={text => params.onChangeText(text)}
        />
      </View>
    )
  };
};

export default container;
