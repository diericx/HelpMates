import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, FlatList, StatusBar } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { List, ListItem, Button, Rating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DataRow from '../../components/general/DataRow';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  list: {},
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: 9,
  },
  takenCourseBtn: {
    width: '$screenWidth',
    height: 60,
    backgroundColor: '$green',
    borderColor: 'transparent',
    marginLeft: -15,
  },
});

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

export default class ChooseTutorScreen extends React.Component {
  static navigationOptions = {
    title: 'Choose a Tutor',
    headerStyle: {
      backgroundColor: '#cd84f1',
    },

    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'Milkshake',
    },
  };

  constructor(props) {
    super(props);
    // params from navigation
    const { params } = this.props.navigation.state;

    this.state = {
      availableUsers: [],
      currentUserIsAvailable: false,
      params: params,
    };

    // get users who have completed this course
    Meteor.call(
      'users.getAllWhoCompletedCourse',
      { courseId: this.state.params.courseId },
      (err, res) => {
        // Do whatever you want with the response
        this.setState({ availableUsers: res });
        this.checkIfCurrentUserIsAvailable();
      },
    );

    // bind functions
    this.takenCourseButtonOnPress = this.takenCourseButtonOnPress.bind(this);
    this.onPress = this.onPress.bind(this);
    this.renderTakenCourseButton = this.renderTakenCourseButton.bind(this);
  }

  // Check to see if this user has already said they have taken the course
  checkIfCurrentUserIsAvailable() {
    for (var i = 0; i < this.state.availableUsers.length; i++) {
      if (this.state.availableUsers[i]._id == Meteor.userId()) {
        this.setState({
          currentUserIsAvailable: true,
        });
      }
    }
  }

  // When a user clicks the "I have taken this course" button
  takenCourseButtonOnPress() {
    // Get available courses from server
    Meteor.call(
      'users.addCompletedCourse',
      { courseId: this.state.params.courseId },
      (err, res) => {
        // Do whatever you want with the response
        this.setState({ courses: res });
      },
    );
  }

  // When someone chooses a time slot
  onPress(params) {
    this.props.navigation.navigate('ChooseTimeSlot', params);
  }

  // renderList() {
  //   return (
  //     <FlatList
  //       style={styles.list}
  //       data={this.state.available_users}
  //       keyExtractor={item => item._id}
  //       renderItem={({ item }) => (
  //         <DataRow
  //           params={{
  //             userId: item._id,
  //             courseId: this.state.params.courseId,
  //             name: item.profile.name,
  //           }}
  //           title1={item.profile.name}
  //           onPress={this.onPress}
  //         />
  //       )}
  //     />
  //   );
  // }

  renderNativeList() {
    return (
      <List containerStyle={{ marginBottom: 20, marginTop: 0 }}>
        {this.state.availableUsers.map((l, i) => (
          <ListItem
            roundAvatar
            avatar={{ uri: defaultAvatar }}
            onPress={() =>
              this.onPress({
                userId: l._id,
                courseId: this.state.params.courseId,
                name: l.profile.name,
              })
            }
            underlayColor="rgb(245,245,245)"
            key={i}
            title={l.profile.name}
            subtitle={
              <View style={styles.ratingContainer}>
                <Rating imageSize={20} readonly startingValue={1} />
              </View>
            }
          />
        ))}
      </List>
    );
  }

  renderTakenCourseButton() {
    if (!this.state.currentUserIsAvailable) {
      return (
        <Button
          title="I've taken this course!"
          textStyle={{ fontSize: 20 }}
          buttonStyle={styles.takenCourseBtn}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTakenCourseButton()}
        <View style={styles.listContainer}>{this.renderNativeList()}</View>
      </View>
    );
  }
}
