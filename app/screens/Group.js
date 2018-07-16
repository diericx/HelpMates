import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "$lightblue"
  },
});

const Group = (props) => {

  return (
    <View style={styles.container}>
      <Text> Here's your group1 </Text>
    </View>
  );
};

export default Group;