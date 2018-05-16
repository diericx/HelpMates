import React from "react";
import Meteor from "react-native-meteor";
import { View, SectionList, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Rating, AirbnbRating } from "react-native-ratings";

// import UserAvatar from "../../../../components/general/UserAvatar/index";
import List from "../../../../components/List/index";
import { GetAverageRating } from "../../../../Helpers/User";

import styles from "./styles";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate("ShowUser", params);
  }

  formatData(users) {
    return users.reduce((acc, user) => {
      // put user into acc
      const foundIndex = acc.findIndex(element => element.key === "People");
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            key: "People",
            data: [{ ...user }]
          }
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, { ...user }];
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
    return this.props.users.filter(user => {
      const filter = this.props.filter.toLowerCase();
      const name = user.profile.name.toLowerCase();
      if (
        name.indexOf(filter) !== -1 ||
        this.userHasCompletedOneOfTheFilteredCourses(user)
      ) {
        return true;
      }
      return false;
    });
  }

  renderItem(item) {
    // get meta data for user
    const ratingsForUser = Meteor.collection("ratings").find({
      targetUserId: item._id
    });
    const avgRating = GetAverageRating(ratingsForUser);
    const ratingCount = ratingsForUser.length;

    return (
      <ListItem
        containerStyle={styles.listItemContainer}
        leftAvatar={
          <Avatar
            rounded
            size={60}
            source={{ uri: item.profile.profilePic, cache: "force-cache" }}
          />
        }
        title={item.profile.name}
        subtitle={
          <View>
            <Rating
              style={styles.subtitleRating}
              fractions={2}
              startingValue={avgRating}
              imageSize={20}
              readonly
            />
            )
            <Text style={styles.subtitleText}>
              {ratingCount} {ratingCount === 1 ? "Review" : "Reviews"}
            </Text>
          </View>
        }
        onPress={() => this.onPress({ user: item })}
      />
    );
  }

  render() {
    // Get users to display based off the filter text, then format the data
    const users = this.formatData(this.filterUsers());
    return <List renderItem={this.renderItem} data={users} />;
  }
}
