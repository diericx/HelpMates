import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CourseList from '../../components/courses/CourseList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "$lightblue"
  },
});

const ChooseCourse = (props) => {
  const universityId = props.navigation.getParam("universityId", null)

  onPress = (course) => {
    props.navigation.navigate('ChooseGroup', {
      courseId: course._id
    })
  }

  return (
    <View style={styles.container}>
      <CourseList 
        universityId={universityId} 
        subscribe={"courses.all"} 
        onPress={this.onPress} 
      />
    </View>
  );
};

export default ChooseCourse;