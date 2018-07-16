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

class ChooseGroup extends React.Component {
  static navigationOptions = {
    title: 'Groups',
  };

  render() {
    const courseId = this.props.navigation.getParam("courseId", null)

    return (
      <View style={styles.container}>
        <GroupList courseId={courseId} />
      </View>
    );
  }
}

export default ChooseGroup;