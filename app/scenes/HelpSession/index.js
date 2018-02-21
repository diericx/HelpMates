import React from 'react';
import { View, Text, Button, SectionList } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, ListItem } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listHeaderContainer: {
    backgroundColor: 'lightgray',
    padding: 4,
  },
  listHeader: {
    fontSize: 12,
    color: 'gray',
  },
});

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

class Index extends React.Component {
  onItemPress(params) {
    this.props.navigation.navigate('Show', params);
  }

  // Figure out which user's name to display for this session
  getNameToDisplayForSession(session) {
    if (Meteor.userId() === session.userId) {
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

  getCourseNameToDisplayForSession(session) {
    return Meteor.collection('courses').findOne(session.courseId).title1;
  }

  // Render the ListItem for this session
  renderItem(item) {
    return <ListItem title={item._id} />;
  }

  // Render the List of user's sessions
  renderSessionList(sessions) {
    if (sessions == null) {
      // render loading circle
      return <View />;
    }
    // render list
    return (
      <List containerStyle={{ marginBottom: 0, marginTop: 0 }}>
        {sessions.map((l, i) => (
          <ListItem
            onPress={() => this.onItemPress(l)}
            underlayColor="rgb(245,245,245)"
            roundAvatar
            avatar={{ uri: defaultAvatar }}
            key={i}
            title={this.getNameToDisplayForSession(l)}
            subtitle={this.getCourseNameToDisplayForSession(l)}
          />
        ))}
      </List>
    );
  }

  render() {
    const { sessionRequests } = this.props;
    const { sessions } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listHeader}> REQUESTS </Text>
        </View>
        {this.renderSessionList(sessionRequests)}
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listHeader}> ACTIVE SESSIONS </Text>
        </View>
        {this.renderSessionList(sessions)}
      </View>
    );
  }
}

export default (container = createContainer((params) => {
  Meteor.subscribe('mySessions');
  return {
    sessionRequests: Meteor.collection('helpSessions').find({ tutorAccepted: false }),
    sessions: Meteor.collection('helpSessions').find({ tutorAccepted: true }),
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
