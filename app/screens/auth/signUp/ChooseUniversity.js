import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import UniversityList from '../../../components/universities/UniversityList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    color: 'white'
  }
});

const ChooseUniversity = (props) => {

  onPress = (university) => {
    props.navigation.navigate('SignUp', {
      university: university,
    })
  }

  return (
    <View style={styles.container}>
      <UniversityList onPress={this.onPress} scrollEnabled={false} headerTextStyle={styles.headerTextStyle} />
    </View>
  );
};

export default ChooseUniversity;