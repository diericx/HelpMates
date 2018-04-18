import React from "react";
import { View, Text, ScrollView } from "react-native";
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
    const { courses } = this.props;
    const filteredCourses = this.filterCourses(courses);

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
  Meteor.subscribe("courses");
  Meteor.subscribe("tutors");
  return {
    users: Meteor.collection("users").find({ _id: { $ne: Meteor.userId() } }),
    courses: Meteor.collection("courses").find()
  };
}, Index);

container.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;

  return {
    // header: null,
    headerTitle: (
      <SearchBar
        placeholder="Search for a person"
        onChangeText={text => params.onChangeText(text)}
      />
    )
  };
};
//#eaeaea
export default container;
