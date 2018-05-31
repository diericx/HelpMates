import React from 'react';
import { Text, View, Animated, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../components/Button';
import NavBar from "../components/navigation/NavBar";
import FadingTransitionView from "../components/FadingTransitionView";


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  navBarTitleContainer: {
    alignItems: "flex-end"
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    // color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

const Courses = (props) => {
  return (
    <View style={{flex: 1}}>

      <View style={styles.container}>
          <Text> Courses </Text>
      </View>

    </View>
  );
};

export default Courses;