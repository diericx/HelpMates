import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Meteor from 'react-native-meteor';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

const DocumentsForGroup = (props) => {
  let { ready, documents } = props;

  keyExtractor = (item, index) => item._id

  if (!ready) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={documents}
        renderItem={({item, index}) => {

          let course = Meteor.collection('groups').findOne({_id: item.groupId});

          return (
            <ListItem
              key={item._id}
              title={item.title1}
              subtitle={course.title1}
              containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
              onPress={() => props.onPress(item)}
              chevron
            />
          )
        }
          
        }
      />
    </View>
  );
};

export default DocumentsForGroup;
