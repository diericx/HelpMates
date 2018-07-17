import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';

import CourseList from '../components/courses/CourseList';
import Button from '../components/Button';
import UserList from "../components/people/UserList";
import GroupList from '../components/groups/GroupList';

const UNI_ID = "9Kn8hjCNex5zP7v4W";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: "red"
  }
});

class Home extends React.Component {
  static navigationOptions = {
    title: 'My Groups',
  };

  onPress = (group) => {
    this.props.navigation.navigate('Group', {
      groupId: group._id
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <GroupList 
          subscribe={"groups.myGroups"} 
          onPress={this.onPress} 
          findOptions={{
            members: {
              $in: [Meteor.userId()]
            }
          }}
        />
      </View>
    );
  }
}

export default Home;