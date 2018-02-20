import React from 'react';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, Image } from 'react-native';

export default class Profile extends React.Component {
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
