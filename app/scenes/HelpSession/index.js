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
          <Card containerStyle={{ padding: 0, marginHorizontal: 0 }}>
            <View style={styles.cardTitleContainer}>
              <Text> Active Sessions </Text>
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
