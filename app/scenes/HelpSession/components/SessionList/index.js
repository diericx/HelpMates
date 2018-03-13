import React from 'react';
import Meteor from 'react-native-meteor';
import { View, Text } from 'react-native';
import { ListItem, Rating } from 'react-native-elements';

import { GetOtherUsersNameForSession, IsSessionActive } from '../../helpers';

import styles from './styles';

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

export default class SessionList extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.onPress = this.onPress.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate('Show', params);
  }

  getCourseNameToDisplayForSession(session) {
    const course = Meteor.collection('courses').findOne(session.courseId);
    if (course) {
      return course.title1;
    }
    return '';
  }

  renderSessionList() {
    const { sessions } = this.props;
    if (sessions === 'undefined' || sessions.length === 0) {
      return (
        <View>
          <Text style={styles.noneMessageText}> {this.props.noneMessage} </Text>
        </View>
      );
    }
    return (
      <View>
        {this.props.sessions.map((s, i) => {
          const otherUsersName = GetOtherUsersNameForSession(s, Meteor.userId());
          let prefix = 'To ';
          if (s.studentId == Meteor.user()._id) {
            prefix = 'From ';
          }
          if (IsSessionActive(s)) {
            prefix = '';
          }

          return (
            <ListItem
              key={i}
              roundAvatar
              title={prefix + otherUsersName}
              subtitle={this.getCourseNameToDisplayForSession(s)}
              avatar={{ uri: defaultAvatar }}
              containerStyle={styles.listItemContainer}
              onPress={() =>
                this.onPress({
                  session: s,
                  otherUsersName,
                })
              }
            />
          );
        })}
      </View>
    );
  }

  render() {
    return <View>{this.renderSessionList()}</View>;
  }
}
