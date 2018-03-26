import React from 'react';
import Meteor from 'react-native-meteor';
import { View } from 'react-native';
import { ListItem, Rating } from 'react-native-elements';

import { CText } from 'app/components/general/CustomText';
import UserAvatar from '../../../../components/general/UserAvatar/index';
import { GetAverageRating } from '../../../../Helpers/User';

import styles from './styles';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.onPress = this.onPress.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate('ShowUser', params);
  }

  userHasCompletedOneOfTheFilteredCourses(user) {
    const completedCourseIds = user.profile.completedCourses;
    for (let i = 0; i < this.props.courses.length; i++) {
      const course = this.props.courses[i];
      if (completedCourseIds[course._id]) {
        return true;
      }
    }
    return false;
  }

  filterUsers() {
    return this.props.users.filter((user) => {
      const filter = this.props.filter.toLowerCase();
      const name = user.profile.name.toLowerCase();
      if (name.indexOf(filter) != -1 || this.userHasCompletedOneOfTheFilteredCourses(user)) {
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <View>
        {this.filterUsers().map((u, i) => {
          const ratingsForUser = Meteor.collection('ratings').find({ targetUserId: u._id });
          const avgRating = GetAverageRating(ratingsForUser);
          return (
            <ListItem
              key={i}
              roundAvatar
              title={u.profile.name}
              subtitle={
                <View style={styles.ratingContainer}>
                  <Rating imageSize={20} readonly startingValue={avgRating} />
                </View>
              }
              avatar={<UserAvatar url={u.profile.profilePic} />}
              containerStyle={styles.listItemContainer}
              onPress={() => this.onPress({ user: u })}
            />
          );
        })}
      </View>
    );
  }
}
