import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Meteor from 'react-native-meteor';

import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import { JoinCourse } from "../../../lib/Meteor";

import styles from './styles';

const CourseList = (props) => {
  let { ready, courses } = props;

  keyExtractor = (item, index) => item._id

  if (!ready) {
    return <ActivityIndicator />
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={courses}
        renderItem={({item, index}) => {
          let { members } = item;
          let isUserInCourse = members.includes(Meteor.userId());

          return <ListItem
            key={item._id}
            // leftAvatar={{ source: { uri: l.avatar_url } }}
            containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
            title={item.title1}
            subtitle={item.title2}
            rightTitle={
              isUserInCourse ? null :
              <Button
                title='Unlock'
                titleStyle={styles.title}
                icon={
                  {
                    name: 'lock', 
                    size: 18, 
                    iconStyle: styles.icon
                  }
                }
                buttonStyle={styles.button}
                onPress={() => JoinCourse(item._id) }
              />
            }
            onPress={isUserInCourse ? () => props.onPress(item) : null}
            chevron={isUserInCourse}
          />
          }
        }
      />
    </View>
  );
};

export default CourseList;
