import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

import DataRow from '../../components/general/DataRow';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    marginTop: 20,
    flexDirection: 'column',
    flex: 1,
  },
  list: {},
});

// Data for debugging layout
mockTutorData = [
  { key: 0, tutor_name: 'Zac Holland' },
  { key: 1, tutor_name: 'Charlie Clark' },
  { key: 2, tutor_name: 'Kerec Spinney' },
  { key: 3, tutor_name: 'Ben Jones' },
  { key: 4, tutor_name: 'John Doe' },
];

export default class ChooseTutorScreen extends React.Component {
  static navigationOptions = {
    title: 'Choose a Tutor',
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

  constructor(props) {
    super(props);
    // params from navigation
    const { params } = this.props.navigation.state;

    this.state = {
      available_users: [],
      params: params,
    };

    // get users who have completed this course
    Meteor.call(
      'users.getAllWhoCompletedCourse',
      { courseId: this.state.params.id },
      (err, res) => {
        // Do whatever you want with the response
        this.setState({ available_users: res });
      },
    );

    // bind functions
    this.takenCourseButtonOnPress = this.takenCourseButtonOnPress.bind(this);
    this.tutorOnPress = this.tutorOnPress.bind(this);
  }

  takenCourseButtonOnPress() {
    // Get available courses from server
    Meteor.call('users.addCompletedCourse', { courseId: this.state.params.id }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ courses: res });
    });
  }

  tutorOnPress(params) {
    this.props.navigation.navigate('ChooseTimeSlot', params);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Button
          onPress={this.takenCourseButtonOnPress}
          title="I have taken this course"
          color="#841584"
        />
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={this.state.available_users}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <DataRow
                params={{ id: item._id, name: item.profile.name }}
                title1={item.profile.name}
                onPress={this.tutorOnPress}
              />
            )}
          />
        </View>
      </View>
    );
  }
}
