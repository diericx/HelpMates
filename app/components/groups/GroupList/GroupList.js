import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Meteor from 'react-native-meteor';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import ListViewSubtitle from '../../ListViewSubtitle';
import { JoinGroup, LeaveGroup } from "../../../lib/Meteor";

import styles from './styles';

const GroupList = (props) => {
  let { ready, groups } = props;

  keyExtractor = (item, index) => item._id

  if (!ready) {
    return <ActivityIndicator />
  }

  console.log(props.onPress == null)

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={groups}
        renderItem={({item, index}) => {
          let { members } = item;

          let headCountSuffix = item.members.length == 1 ? " Person" : " People"
          let isUserInGroup = members.includes(Meteor.userId());

          let course = Meteor.collection('courses').findOne({_id: item.courseId});
          console.log(course);

          return (
            <ListItem
              key={item._id}
              title={item.title1}
              subtitle={<ListViewSubtitle subtitle={course.title1} userCount={course.members.length} />}
              containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
              leftIcon={
                {
                  name: "verified-user",
                  size: 32,
                  iconStyle: styles.icon
                }
              }
              rightTitle={
                props.onPress == null ? 
                <Button
                  title=''
                  // titleStyle={styles.buttonTitle}
                  icon={
                    {
                      name: isUserInGroup ? 'highlight-off' : 'add-circle-outline', 
                      size: 35, 
                      color: 'black'
                    }
                  }
                  buttonStyle={styles.button}
                  onPress={isUserInGroup ? 
                    () => LeaveGroup(item._id) :
                    () => JoinGroup(item._id) }
                />
                :
                null
              }
              onPress={() => props.onPress(item)}
              chevron={!(props.onPress == null)}
            />
          )
        }
          
        }
      />
    </View>
  );
};

export default GroupList;
