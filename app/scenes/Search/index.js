import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Card, SearchBar, Divider } from 'react-native-elements';

import UserList from './components/UserList/index';
import CourseList from './components/CourseList/index';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: '$lightgray',
  },
  cardTitleContainer: {
    paddingVertical: 5,
    paddingLeft: 5,
    backgroundColor: '$lightgray',
  },
  cardTitleContainerHighlighted: {
    paddingVertical: 2,
    backgroundColor: '$greenTrans',
    alignItems: 'center',
  },
  cardTitleHighlighted: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };

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
        <SearchBar
          lightTheme
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          onChangeText={this.onSearchChangeText}
          onClearText={this.onSearchClearText}
          placeholder="Search for a person or a course"
        />

        <ScrollView>
          {/* Users Card */}
          <Card containerStyle={{ padding: 0, marginHorizontal: 0 }}>
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

          {/* Courses Card */}
          <Card containerStyle={{ padding: 0, marginHorizontal: 0 }}>
            <View style={styles.cardTitleContainer}>
              <Text> Courses </Text>
            </View>
            <View style={[styles.cardTitleContainer, styles.cardTitleContainerHighlighted]}>
              <Text style={styles.cardTitleHighlighted}>Chat anonymously with other students!</Text>
            </View>
            <Divider />

            <CourseList
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

container.navigationOptions = {
  title: 'HelpMates',
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: '#cd84f1',
  },

  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Milkshake',
  },
};

export default container;
