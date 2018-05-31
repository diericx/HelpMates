import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "white",
  },
  scrollView: {
    padding: 0,
    margin: 0,
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    // color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

const Messages = (props) => {
  return (
    <View style={{flex: 1}}>
      <View contentContainerStyle={styles.container}>
          <Text> Messages </Text>
      </View>
    </View>
  );
};

export default Messages;