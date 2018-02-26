import React from 'react';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, Image } from 'react-native';

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Zac Holland',
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
    this.state = {
      profilePicSource: null,
    };
  }

  logout() {
    Meteor.logout();
  }

  render() {
    return (
      <View>
        <Text> Profile Screen </Text>
        <Button onPress={this.logout} title="Logout" />
        <Image source={this.state.avatarSource} />
      </View>
    );
  }
}
