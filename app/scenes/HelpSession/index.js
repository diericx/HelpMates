import React from 'react';
import { View, Text, Button, SectionList } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, ListItem } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: {
    marginTop: -20,
  },
});

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

class Index extends React.Component {
  onItemPress(params) {
    this.props.navigation.navigate('Show', params);
  }

  getNameToDisplayForSession(session) {
    if (Meteor.userId() == session.userId) {
      const user = Meteor.collection('users').findOne(session.tutorId);
      if (user) {
        return user.profile.name;
      }
    }
    const user = Meteor.collection('users').findOne(session.userId);
    if (user) {
      return user.profile.name;
    }
    return '';
  }

  renderItem(item) {
    return <ListItem title={item._id} />;
  }

  renderSessionList(sessions) {
    if (sessions == null) {
      // render loading circle
      return <View />;
    }
    // render list
    return (
      <List containerStyle={{ marginBottom: 20 }}>
        {sessions.map((l, i) => (
          <ListItem
            onPress={() => this.onItemPress(l)}
            underlayColor="rgb(245,245,245)"
            roundAvatar
            avatar={{ uri: defaultAvatar }}
            key={i}
            title={this.getNameToDisplayForSession(l)}
            subtitle={l.subtitle}
          />
        ))}
      </List>
    );
  }

  render() {
    const { sessions } = this.props;
    return <View style={styles.container}>{this.renderSessionList(sessions)}</View>;
  }
}

export default (container = createContainer((params) => {
  Meteor.subscribe('mySessions');
  return {
    sessions: Meteor.collection('helpSessions').find(),
  };
}, Index));

container.navigationOptions = {
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
