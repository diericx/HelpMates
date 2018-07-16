import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GroupList from '../../components/groups/GroupList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "$lightblue"
  },
});

const ChooseGroup = (props) => {
  const courseId = props.navigation.getParam("courseId", null)

  onPress = (group) => {
    props.navigation.navigate('ChooseCourse', {
      universityId: university._id
    })
  }

  return (
    <View style={styles.container}>
      <GroupList courseId={courseId} onPress={this.onPress} />
    </View>
  );
};

export default ChooseGroup;