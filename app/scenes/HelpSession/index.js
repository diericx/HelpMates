import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, ListItem, Card, Divider } from 'react-native-elements';

import SessionList from './components/SessionList/index';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  cardTitleContainer: {
    paddingVertical: 5,
    paddingLeft: 5,
    backgroundColor: '$lightgray',
  },
});

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

class Index extends React.Component {
  onItemPress(params) {
    this.props.navigation.navigate('Show', params);
  }

  render() {
    const { sessionRequestsReceived } = this.props;
    const { sessionRequestsSent } = this.props;
    const { sessions } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* Active Sessions */}
          <Card containerStyle={{ padding: 0 }}>
            <View style={styles.cardTitleContainer}>
              <Text> Active Sessions </Text>
            </View>
            <Divider />

            <SessionList sessions={sessions} navigation={this.props.navigation} />
          </Card>

          {/* Requests Received */}
          <Card containerStyle={{ padding: 0 }}>
            <View style={styles.cardTitleContainer}>
              <Text> Requests Received </Text>
            </View>
            <Divider />

            <SessionList
              sessions={sessionRequestsReceived}
              noneMessage="Try lowering your prices a bit."
              navigation={this.props.navigation}
            />
          </Card>

          {/* Requests Sent */}
          <Card containerStyle={{ padding: 0 }}>
            <View style={styles.cardTitleContainer}>
              <Text> Requests Sent </Text>
            </View>
            <Divider />

            <SessionList
              sessions={sessionRequestsSent}
              noneMessage="Need some help? Go send someone a request!"
              navigation={this.props.navigation}
            />
          </Card>

          {/* <View style={styles.listHeaderContainer}>
          <Text style={styles.listHeader}> UPCOMMING SESSIONS </Text>
        </View>
        {this.renderSessionList(sessions, 'You have no active sessions')}
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listHeader}> REQUESTS </Text>
        </View>
        {this.renderSessionList(sessionRequests, 'You have no requests! Try lowering your rate.')} */}
        </ScrollView>
      </View>
    );
  }
}

const container = createContainer((params) => {
  // subscribe to meteor collections
  Meteor.subscribe('mySessions');
  return {
    sessionRequestsReceived: Meteor.collection('helpSessions').find({
      tutorAccepted: false,
      tutorId: Meteor.userId(),
    }),
    sessionRequestsSent: Meteor.collection('helpSessions').find({
      tutorAccepted: false,
      studentId: Meteor.userId(),
    }),
    sessions: Meteor.collection('helpSessions').find({ tutorAccepted: true }),
  };
}, Index);

container.navigationOptions = {
  title: 'My Sessions',
  headerBackTitle: 'Back',
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

export default container;
