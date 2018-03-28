import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { Card, SearchBar, Divider } from 'react-native-elements';

import UserList from '../components/UserList/index';

import styles from './styles';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };

    this.props.test = 'asdf';

    // bind
    this.onSearchChangeText = this.onSearchChangeText.bind(this);
  }

  onSearchChangeText(text) {
    this.setState({
      searchText: text,
    });
  }

  onSearchClearText() {}

  filterCourses(courses) {
    return courses.filter((course) => {
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
    const { users } = this.props;
    const { courses } = this.props;
    const filteredCourses = this.filterCourses(courses);

    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            onChangeText={this.onSearchChangeText}
            onClearText={this.onSearchClearText}
            placeholder="Search for a person or a course"
          />
        </View>

        <ScrollView>
          {/* Users Card */}
          <Card containerStyle={styles.cardContainer}>
            <View style={styles.cardTitleContainer}>
              <Text> People </Text>
            </View>
            <Divider />

            <UserList
              users={users}
              courses={filteredCourses}
              filter={this.state.searchText}
              navigation={this.props.navigation}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const container = createContainer((params) => {
  Meteor.subscribe('courses');
  Meteor.subscribe('tutors');
  return {
    users: Meteor.collection('users').find({ _id: { $ne: Meteor.userId() } }),
    courses: Meteor.collection('courses').find(),
  };
}, Index);

// Set the header to be a null so we can create our own
container.navigationOptions = {
  // header: null,
};

export default container;
