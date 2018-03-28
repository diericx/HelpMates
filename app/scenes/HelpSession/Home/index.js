import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { Card, Divider } from 'react-native-elements';

import SessionList from '../components/SessionList/index';

import styles from './styles';

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
          <Card containerStyle={{ padding: 0, marginHorizontal: 0 }}>
            <View style={styles.cardTitleContainer}>
              <Text> Upcoming Sessions </Text>
            </View>
            <Divider />

            <SessionList sessions={sessions} navigation={this.props.navigation} />
          </Card>

          {/* Requests */}
          <Card containerStyle={{ padding: 0, marginHorizontal: 0 }}>
            <View style={styles.cardTitleContainer}>
              <Text> Requests </Text>
            </View>
            <Divider />

            <SessionList
              sessions={sessionRequestsReceived.concat(sessionRequestsSent)}
              noneMessage="Try lowering your prices a bit."
              navigation={this.props.navigation}
            />
          </Card>
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

export default container;
