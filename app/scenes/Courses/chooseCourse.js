import React from 'react';
import { View, Text, Button, FlatList, StatusBar, AsyncStorage } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor, { Accounts, createContainer } from 'react-native-meteor';

import DataRow from '../../components/general/DataRow';

const UNI_ID = 'bJ2ppiHYrMFRThfWE';

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
mockCourseData = [
  { key: 0, course_name: 'Computer Science I' },
  { key: 1, course_name: 'Computer Science II' },
  { key: 2, course_name: 'Computer Science III' },
];

export default class ChooseCourseScreen extends React.Component {
  static navigationOptions = {
    title: 'Choose a Course',
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
    this.state = { courses: [] };
    // Get available courses from server
    Meteor.call('courses.getAllForUni', { universityId: UNI_ID }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ courses: res });
    });

    // Bind functions to this
    this.onPress = this.onPress.bind(this);
  }

  onPress(params) {
    this.props.navigation.navigate('ChooseTutor', params);
  }

  renderCourses() {
    return (
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={this.state.courses}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <DataRow params={{ id: item._id }} title1={item.title1} onPress={this.onPress} />
          )}
        />
      </View>
    );
  }

  render() {
    const { courses } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text> {courses} </Text>
        {this.state.courses.length > 0 ? this.renderCourses() : console.log('loading...')}
      </View>
    );
  }
}
