import React, { Component } from "react";
import Meteor from "react-native-meteor";
import { View, ScrollView, Text } from "react-native";
import { Card, Rating, Divider } from "react-native-elements";

import List from "../../../../components/List";
import UserAvatar from "../../../../components/general/UserAvatar/index";
import styles from "./styles";

class Index extends Component {
  renderItem(rating) {
    const ratingAuthor = Meteor.collection("users").findOne({
      _id: rating.userId
    });
    return (
      <Card key={i}>
        <View style={styles.headerContainer}>
          <UserAvatar url={ratingAuthor.profile.profilePic} size={50} />
          <View style={styles.headerRightContainer}>
            <Text style={styles.nameText}>{user.profile.name}</Text>
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
      <View>
        <List
          data={this.formatData(ratingsForUser)}
          renderItem={this.renderItem}
          noneMessage={"No Reviews"}
        />
      </View>
    );
    //   return (
    //     <ScrollView>
    //       {ratingsForUser.map((rating, i) => {
    //         const ratingAuthor = Meteor.collection('users').findOne({ _id: rating.userId });
    //         return (
    //           <Card key={i}>
    //             <View style={styles.headerContainer}>
    //               <UserAvatar url={ratingAuthor.profile.profilePic} size={50} />
    //               <View style={styles.headerRightContainer}>
    //                 <Text style={styles.nameText}>{user.profile.name}</Text>
    //                 <Rating imageSize={23} readonly startingValue={rating.rating} color="red" />
    //               </View>
    //             </View>
    //             <Divider />
    //             <View style={styles.ratingMessageContainer}>
    //               <Text>{rating.message}</Text>
    //             </View>
    //           </Card>
    //         );
    //       })}
    //     </ScrollView>
    //   );
    // }
  }
}

export default Index;
