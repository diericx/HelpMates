import React from 'react';
import Meteor from 'react-native-meteor';
import { View, SectionList, Text } from 'react-native';
import { List, ListItem, Rating } from 'react-native-elements';

import UserAvatar from 'app/components/general/UserAvatar/index';
import { GetAverageRating } from 'app/Helpers/User';

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

  formatData(users) {
    return users.reduce((acc, user) => {
      // get meta data for user
      const ratingsForUser = Meteor.collection('ratings').find({ targetUserId: user._id });
      const avgRating = GetAverageRating(ratingsForUser);
      // put user into acc
      const foundIndex = acc.findIndex(element => element.key === 'People');
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            key: 'People',
            data: [{ ...user, avgRating }],
          },
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, { ...user, avgRating }];
      return acc;
    }, []);
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
      if (name.indexOf(filter) !== -1 || this.userHasCompletedOneOfTheFilteredCourses(user)) {
        return true;
      }
      return false;
    });
  }

  renderSectionHeader(section) {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}> {section.key} </Text>
      </View>
    );
  }

  render() {
    // Get users to display based off the filter text, then format the data
    const users = this.formatData(this.filterUsers());
    return (
      <List containerStyle={styles.container}>
        <SectionList
          renderItem={({ item }) => (
            <ListItem
              containerStyle={styles.listItemContainer}
              roundAvatar
              avatar={<UserAvatar url={item.profile.profilePic} />}
              title={item.profile.name}
              subtitle={
                <View>
                  <View style={styles.ratingContainer}>
                    <Rating
                      style={styles.subtitleRating}
                      imageSize={20}
                      readonly
                      startingValue={item.avgRating}
                    />
                  </View>
                </View>
              }
              onPress={() => this.onPress({ user: item })}
            />
          )}
          renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
          keyExtractor={item => item._id}
          sections={users}
          ListFooterComponent={() => <View style={styles.listFooter} />}
        />
      </List>
      // <View>
      //   {this.filterUsers().map((u, i) => (
      //     <ListItem
      //       key={i}
      //       roundAvatar
      //       title={u.profile.name}
      //       subtitle={
      //         <View>
      //           <View style={styles.ratingContainer}>
      //             <Rating
      //               style={styles.subtitleRating}
      //               imageSize={20}
      //               readonly
      //               startingValue={avgRating}
      //             />
      //           </View>
      //         </View>
      //       }
      //       avatar={<UserAvatar url={u.profile.profilePic} />}
      //       containerStyle={styles.listItemContainer}
      //       onPress={() => this.onPress({ user: u })}
      //     />
      //   ))}
      // </View>
    );
  }
}
