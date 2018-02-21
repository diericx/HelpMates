import React from 'react';
import Meteor from 'react-native-meteor';
import update from 'immutability-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar, TouchableOpacity } from 'react-native';

import UserAgenda from './components/agenda';
import { DateToString, DateToLocalString, DateGet12HourTime } from './helpers';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class ChooseTimeSlot extends React.Component {
  static navigationOptions = {
    title: 'Pick a time',
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
      params: params,
      startDate: null,
      endDate: null,
      availabilities: [],
      items: {},
      isModalVisible: false,
    };
    // get this users availabilities
    this.getAvailabilities();
  }

  // METEOR - get availabilities for this user
  getAvailabilities() {
    Meteor.call('users.getAvailabilities', { userId: this.state.params.userId }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ availabilities: res });
    });
  }

  render() {
    console.log('Availabilities: ', this.state.availabilities);
    return (
      <View style={styles.container}>
        <UserAgenda
          availabilities={this.state.availabilities}
          name={this.state.params.name}
          userId={this.state.params.userId}
          courseId={this.state.params.courseId}
        />
      </View>
    );
  }
}
