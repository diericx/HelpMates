import React from 'react';
import Meteor from 'react-native-meteor';
import { View, Text } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';

import UserAvatar from 'app/components/general/UserAvatar/index';
import { GetAverageRating } from 'app/Helpers/User';
import styles from './styles';

export default class ProfileCard extends React.Component {
  render() {
    const { user } = this.props;
    const ratingsForUser = Meteor.collection('ratings').find({ targetUserId: user._id });
    const ratingCount = ratingsForUser.length;
    const avgRating = GetAverageRating(ratingsForUser);
    return (
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <UserAvatar url={user.profile.profilePic} size={100} />
        </View>

        <View style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{user.profile.name}</Text>
          <Text style={styles.subtitleText}>Computer Science</Text>
          <Rating imageSize={20} readonly startingValue={avgRating} />
          <Text style={styles.subtitleText}>
            {ratingCount} {ratingCount == 1 ? 'Review' : 'Reviews'}
          </Text>
        </View>
      </View>
    );
  }
}
