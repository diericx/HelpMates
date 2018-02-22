import React from 'react';
import { View, Text, Button, SectionList } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, ListItem } from 'react-native-elements';

import { GetOtherUsersNameForSession } from './helpers';

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
  listAltText: {
    paddingVertical: 8,
    paddingLeft: 8,
    color: 'gray',
  },
});

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

class Index extends React.Component {
  onItemPress(params) {
    this.props.navigation.navigate('Show', params);
  }

  getCourseNameToDisplayForSession(session) {
    const course = Meteor.collection('courses').findOne(session.courseId);
    if (course) {
      return course.title1;
    }
    return '';
  }

  // Render the ListItem for this session
  renderItem(item) {
    return <ListItem title={item._id} />;
  }

  // Render the List of user's sessions
  renderSessionList(sessions, altText) {
    if (sessions == null || sessions.length === 0) {
      // render loading circle
      return (
        <View>
          <Text style={styles.listAltText}> {altText} </Text>
        </View>
      );
    }
    // render list
    return (
      <List containerStyle={{ marginBottom: 0, marginTop: 0 }}>
        {sessions.map((l, i) => (
          <ListItem
            onPress={() =>
              this.onItemPress({
                session: l,
                otherUsersName: GetOtherUsersNameForSession(l, Meteor.userId()),
              })
            }
            underlayColor="rgb(245,245,245)"
            roundAvatar
            avatar={{ uri: defaultAvatar }}
            key={i}
            title={GetOtherUsersNameForSession(l, Meteor.userId())}
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
        {this.renderSessionList(sessionRequests, 'You have no requests! Try lowering your rate.')}
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listHeader}> ACTIVE SESSIONS </Text>
        </View>
        {this.renderSessionList(sessions, 'You have no active sessions')}
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
