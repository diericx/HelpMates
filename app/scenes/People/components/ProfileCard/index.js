import React from 'react';
import Meteor from 'react-native-meteor';
import { View, Text } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';

import UserAvatar from '../../../../components/general/UserAvatar/index';
import { GetAverageRating } from '../../../../Helpers/User';
import styles from './styles';

export default class ProfileCard extends React.Component {
  render() {
    const { user } = this.props;
    const ratingsForUser = Meteor.collection('ratings').find({ targetUserId: user._id });
    const ratingCount = ratingsForUser.length;
    const avgRating = GetAverageRating(ratingsForUser);
    console.log('CCourses: ', user.profile.completedCourses);
    return (
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <UserAvatar url={user.profile.profilePic} size={110} />
        </View>

        <View style={styles.profileDataContainer}>
          {/* <Text style={styles.nameText}>{user.profile.name}</Text> */}
          <Text style={styles.detailsText}>Computer Science Major</Text>

          <Rating imageSize={35} readonly startingValue={avgRating} />
          <Text style={styles.subtitleText}>
            {ratingCount} {ratingCount === 1 ? 'Review' : 'Reviews'}
          </Text>
        </View>
      </View>
    );
  }
}
