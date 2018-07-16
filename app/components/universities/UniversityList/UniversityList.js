import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

const UniversityList = (props) => {
  let { ready, universities } = props;

  keyExtractor = (item, index) => item._id

  if (!ready) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={universities}
        renderItem={({item}) => 
          <ListItem
            key={item._id}
            // leftAvatar={{ source: { uri: l.avatar_url } }}
            title={item.name}
            subtitle={item.city}
            onPress={() => props.onPress(item) }
            chevron
          />
        }
      />
    </View>
  );
};

export default UniversityList;
