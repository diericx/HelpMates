import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import update from 'immutability-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import UserAgenda from './components/agenda';
import ProfileCard from './components/profileCard';
import { DateToString, DateToLocalString, DateGet12HourTime } from './helpers';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  agenda: {
    flex: 1,
    width: '100%',
  },
  buttonGroup: {
    width: '80%',
    height: 30,
    marginTop: 20,
  },
});

class Show extends React.Component {
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
      selectedIndex: 0,
    };
    // get this users availabilities
    this.getAvailabilities();
    // bind
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  // METEOR - get availabilities for this user
  getAvailabilities() {
    Meteor.call('users.getAvailabilities', { userId: this.state.params.userId }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ availabilities: res });
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    const buttons = ['Get Help', 'Reviews'];
    const { user } = this.state.params;
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <ProfileCard name={user.profile.name} rating={user.profile.rating} />
        <View>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttonGroup}
          />
        </View>
        <View style={styles.agenda}>
          {/* <UserAgenda
            availabilities={this.state.availabilities}
            name={this.state.params.name}
            userId={this.state.params.userId}
            courseId={this.state.params.courseId}
          /> */}
        </View>
      </View>
    );
  }
}

const container = createContainer(params => ({}), Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    title: params.title || 'Choose Time Slot',
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
