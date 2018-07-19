import React from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
import Meteor from 'react-native-meteor';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import { UpdateDocumentEntryTitle, UpdateDocumentEntrySubTitle } from '../../lib/Meteor';

import styles from './styles';

const Document = (props) => {
  let { ready, document } = props;
  let { entries, title1 } = document;

  if (!ready) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView style={styles.container}>
      {entries.map((entry, i) => {
        let { title, body, updatedBy } = entry;
        return (
          <View key={i} style={styles.entryContainer}>
            <Text style={styles.entryTitle}>{title}</Text>
            <Text style={styles.entryBody}>{body}</Text>
            <Text style={styles.messageText}>Last edited by {updatedBy}</Text>
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
