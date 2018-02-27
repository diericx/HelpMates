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
  cardTitle: {
    paddingVertical: 5,
    paddingLeft: 5,
    backgroundColor: '$lightgray',
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

  render() {
    const { users } = this.props;
    const { courses } = this.props;

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
          <Card containerStyle={{ padding: 0 }}>
            <View style={styles.cardTitle}>
              <Text> People </Text>
            </View>
            <Divider />

            <UserList
              users={users}
              filter={this.state.searchText}
              navigation={this.props.navigation}
            />
          </Card>

          {/* Courses Card */}
          <Card containerStyle={{ padding: 0 }}>
            <View style={styles.cardTitle}>
              <Text> Courses </Text>
            </View>
            <Divider />

            <CourseList
              courses={courses}
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
  title: 'Search',
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
