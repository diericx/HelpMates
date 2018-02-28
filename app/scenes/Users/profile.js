import React from 'react';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'Availability',
    icon: 'av-timer',
    screen: 'Availability',
  },
  {
    title: 'Courses',
    icon: 'book',
    iconType: 'entypo',
    screen: 'Courses',
  },
];

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
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
    // bind
    this.onPress = this.onPress.bind(this);
  }

  logout() {
    Meteor.logout();
  }

  onPress(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    return (
      <View>
        <List>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon, type: item.iconType }}
              onPress={() => this.onPress(item.screen)}
            />
          ))}
        </List>

        <Button onPress={this.logout} title="Logout" />
        <Image source={this.state.avatarSource} />
      </View>
    );
  }
}
