import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';

import CourseList from '../../components/courses/CourseList';
import PathBar from '../../components/PathBar';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

class ChooseCourse extends React.Component {
  static navigationOptions = {
    title: 'Courses',
  };

  onPress = (course) => {
    this.props.navigation.navigate('ChooseGroup', {
      courseId: course.id
    })
  }

  render() {

    return (
      <View style={styles.container}>

        <CourseList 
          universityId={'Lz3HTeqI5w3C3Xe7nHRd'}
          onPress={this.onPress} 
        />

      </View>
    );
  }
}

export default ChooseCourse;