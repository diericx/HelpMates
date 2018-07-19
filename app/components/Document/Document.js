import React from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
import Meteor from 'react-native-meteor';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import { UpdateDocumentEntryTitle, UpdateDocumentEntrySubTitle } from '../../lib/Meteor';

import styles from './styles';

const Document = (props) => {
  let { ready, document } = props;
  let { data, title1 } = document;

  if (!ready) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView style={styles.container}>
      {data.map((entry, i) => {
        let { title, subtitle } = entry;
        return (
          <View key={i}>
            <Text style={styles.entryTitle}>{title}</Text>
            <Text style={styles.entrySubtitle}>{subtitle}</Text>
            {/* <TextInput
              style={{borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => UpdateDocumentEntryTitle(i, text)}
              value={title}
            /> */}
          </View>
        )
      })}
    </ScrollView>
  );
};

export default Document;
