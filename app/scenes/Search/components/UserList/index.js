import React from 'react';
import Meteor from 'react-native-meteor';
import { View } from 'react-native';
import { ListItem, Rating } from 'react-native-elements';

import styles from './styles';

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

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
    console.log(completedCourseIds);
    console.log(this.props.courses);
    for (let i = 0; i < this.props.courses.length; i++) {
      const course = this.props.courses[i];
      if (completedCourseIds.includes(course._id)) {
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
        {this.filterUsers().map((u, i) => (
          <ListItem
            key={i}
            roundAvatar
            title={u.profile.name}
            subtitle={
              <View style={styles.ratingContainer}>
                <Rating imageSize={20} readonly startingValue={3} />
              </View>
            }
            avatar={{ uri: defaultAvatar }}
            containerStyle={styles.listItemContainer}
            onPress={() => this.onPress({ id: u._id, title: u.profile.name })}
          />
        ))}
      </View>
    );
  }
}
