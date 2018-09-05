import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import CourseGroupsList from '../../components/Explore/CourseGroupsList';
import { validate } from '../../lib/Utils';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

@compose(
  firestoreConnect(({ navigation }) => {
    // Get groupId from navigation params
    const courseId = navigation.getParam('courseId', null);
    validate('ChooseGroup.firestoreConnect() courseId should exist as a nav param. ', courseId);

    // Return query
    return [
      {
        collection: 'groups',
        where: ['courseId', '==', courseId],
      },
    ];
  }),
  connect(({ firestore }, { auth }) => ({
    groups: firestore.ordered.groups,
    auth,
  }))
)
class ChooseGroup extends React.Component {
  static navigationOptions = {
    title: 'Groups',
  };

  render() {
    const { groups } = this.props;
    return (
      <View style={styles.container}>
        <CourseGroupsList groups={groups} />
      </View>
    );
  }
}

export default ChooseGroup;
