import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import Meteor, { createContainer } from "react-native-meteor";
import { Card, Divider, Icon } from "react-native-elements";

import UserList from "../components/UserList/index";
import SearchBar from "../../../components/SearchBar/index";

import styles from "./styles";

class Index extends React.Component {
  static onChangeText = this.onSearchChangeText;

  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    // bind
    this.onSearchChangeText = this.onSearchChangeText.bind(this);
  }

  // Set onChangeText in nav params so tab bar can see it
  componentDidMount() {
    this.props.navigation.setParams({
      onChangeText: this.onSearchChangeText
    });
  }

  onSearchChangeText(text) {
    this.setState({
      searchText: text
    });
  }

  onSearchClearText() {}

  filterCourses(courses) {
    return courses.filter(course => {
      const filter = this.state.searchText.toLowerCase();
      const title1 = course.title1.toLowerCase();
      const title2 = course.title2.toLowerCase();
      if (title1.indexOf(filter) !== -1 || title2.indexOf(filter) !== -1) {
        return true;
      }
      return false;
    });
  }

  render() {
    const { users } = this.props;
    const { courses, tutorsReady } = this.props;
    const filteredCourses = this.filterCourses(courses);

    if (!tutorsReady) {
      return (
        <ActivityIndicator animating size="large" style={{ marginTop: 15 }} />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer} />
        <UserList
          users={users}
          courses={filteredCourses}
          filter={this.state.searchText}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const container = createContainer(params => {
  const tutorsHandle = Meteor.subscribe("tutors");
  return {
    tutorsReady: tutorsHandle.ready(),
    users: Meteor.collection("users").find(),
    courses: Meteor.collection("courses").find()
  };
}, Index);

container.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;

  return {
    // header: null,
    headerTitle: (
      <SearchBar
        placeholder="Search by name or course"
        onChangeText={text => params.onChangeText(text)}
      />
    )
  };
};
//#eaeaea
export default container;
