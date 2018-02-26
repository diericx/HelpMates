import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import update from 'immutability-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar, TouchableOpacity } from 'react-native';

import UserAgenda from './components/agenda';
import { DateToString, DateToLocalString, DateGet12HourTime } from './helpers';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  userData: {
    height: '50%',
  },
  agenda: {
    flex: 1,
    width: '100%',
  },
});

class ChooseTimeSlot extends React.Component {
  constructor(props) {
    super(props);
    // params from navigation
    const { params } = this.props.navigation.state;
    this.state = {
      params,
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
    return (
      <View style={styles.container}>
        <View style={styles.userData} />
        <View style={styles.agenda}>
          <UserAgenda
            availabilities={this.state.availabilities}
            name={this.state.params.name}
            userId={this.state.params.userId}
            courseId={this.state.params.courseId}
          />
        </View>
      </View>
    );
  }
}

const container = createContainer(params => ({}), ChooseTimeSlot);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    title: params.name || 'Choose Time Slot',
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
};

export default container;
