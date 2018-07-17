import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { GetChosenUniversityId, SetChosenUniversityId } from '../../lib/LocalStorage';

import UniversityList from '../../components/universities/UniversityList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

const Messages = (props) => {
  const id = props.navigation.getParam("id", null)

  // If the user has chosen a university before, go to it
  GetChosenUniversityId().then(universityId => {
    if (universityId != null) {
      props.navigation.navigate('ChooseCourse', {
        universityId
      })
    }
  });

  onPress = (university) => {
    SetChosenUniversityId(university._id);
    props.navigation.navigate('ChooseCourse', {
      universityId: university._id
    })
  }

  return (
    <View style={styles.container}>
      <UniversityList onPress={this.onPress} />
    </View>
  );
};

export default Messages;