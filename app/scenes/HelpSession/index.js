import React from 'react';
import { View, Text, Button, SectionList } from 'react-native';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, ListItem } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: {
    marginTop: -20,
  },
});

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

export default class Index extends React.Component {
  static navigationOptions = {
    title: 'My Sessions',
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
      sessions: null,
    };

    // Get data from server
    this.getSessions();
  }

  // METEOR
  getSessions() {
    Meteor.call('helpSessions.get', { userId: Meteor.userId() }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ sessions: res });
    });
  }

  renderItem(item) {
    return <ListItem title={item._id} />;
  }

  onItemPress(params) {
    this.props.navigation.navigate('Show', params);
  }

  renderSessionList() {
    if (this.state.sessions == null) {
      // render loading circle
      return <View />;
    } else {
      // render list
      return (
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.sessions.map((l, i) => (
            <ListItem
              onPress={() => this.onItemPress(l)}
              underlayColor="rgb(245,245,245)"
              roundAvatar
              avatar={{ uri: defaultAvatar }}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))}
        </List>
      );
    }
  }

  render() {
    return <View style={styles.container}>{this.renderSessionList()}</View>;
  }
}
