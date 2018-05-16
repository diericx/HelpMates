import React, { Component } from "react";
import Meteor from "react-native-meteor";
import { View, ScrollView, Text } from "react-native";
import { Card, Rating, Divider, Avatar } from "react-native-elements";

import List from "../../../../components/List";
import styles from "./styles";

class Index extends Component {
  renderItem(rating) {
    const ratingAuthor = Meteor.collection("users").findOne({
      _id: rating.userId
    });

    return (
      <Card key={rating._id} containerStyle={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            size={50}
            source={{
              uri: ratingAuthor.profile.profilePic,
              cache: "force-cache"
            }}
          />
          {/* <UserAvatar url={ratingAuthor.profile.profilePic} size={50} /> */}
          <View style={styles.headerRightContainer}>
            <Text style={styles.nameText}>{ratingAuthor.profile.name}</Text>
            <Rating
              imageSize={23}
              readonly
              startingValue={rating.rating}
              color="red"
            />
          </View>
        </View>
        <Divider />
        <View style={styles.ratingMessageContainer}>
          <Text>{rating.message}</Text>
        </View>
      </Card>
    );
  }

  formatData(ratings) {
    if (ratings.length == 0) {
      return [];
    }
    return [{ data: ratings, key: "NONE" }];
  }

  render() {
    const { user } = this.props;
    const ratingsForUser = Meteor.collection("ratings").find({
      targetUserId: user._id
    });

    return (
      <View style={styles.container}>
        <List
          data={this.formatData(ratingsForUser)}
          renderItem={this.renderItem}
          footer={false}
          noneMessage={"No Reviews"}
        />
      </View>
    );
  }
}

export default Index;
