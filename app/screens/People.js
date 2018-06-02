import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../components/Button';
import UserList from "../components/people/UserList";


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    // backgroundColor: "red"
  },
  scrollViewContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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

const users = [
  {
    _id: "1",
    fullName: "John Doe",
    avatar: "https://s3-us-west-2.amazonaws.com/helpmatesmedia/uploads/profilePic-5883qesZDQ22RNbhG.jp",
    rating: 4.5,
    bio: "I'm a third year computer science major. I've been tutoring for about 3 years.",
    relatedCourses: ["Intro to Computer Science 1", "English Survey", "Buisness Analytics"]
  },
  {
    _id: "2",
    fullName: "Kate Jeffry",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 4,
    bio: "I am an english major. I can help with almost any english class and still have.",
    relatedCourses: ["English Survey", "Buisness Analytics"]
  },
  {
    _id: "3",
    fullName: "Kate Jeffry",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 4,
    bio: "I am an english major. I can help with almost any english class and still have.",
    relatedCourses: ["English Survey", "Buisness Analytics"]
  },
  {
    _id: "4",
    fullName: "Kate Jeffry",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 4,
    bio: "I am an english major. I can help with almost any english class and still have.",
    relatedCourses: ["English Survey", "Buisness Analytics"]
  },
  {
    _id: "5",
    fullName: "Kate Jeffry",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 4,
    bio: "I am an english major. I can help with almost any english class and still have.",
    relatedCourses: ["English Survey", "Buisness Analytics"]
  }
]



const People = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <UserList users={users} />
      </ScrollView>
    </View>
  );
};

export default People;