import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from '../components/Button';

import UserList from "../components/people/UserList";

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
  }
]



const Home = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <UserList users={users} />
    </ScrollView>
  );
};

export default Home;