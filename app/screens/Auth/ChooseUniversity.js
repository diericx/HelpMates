import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import UniversityList from '../../components/Auth/UniversityList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$turquoise',
  },
  headerTextStyle: {
    color: 'white',
  },
});

const ChooseUniversity = props => {
  const onPress = university => {
    props.navigation.navigate('SignUp', {
      university,
    });
  };

  return (
    <View style={styles.container}>
      <UniversityList
        onPress={onPress}
        scrollEnabled={false}
        headerTextStyle={styles.headerTextStyle}
      />
    </View>
  );
};

export default ChooseUniversity;
