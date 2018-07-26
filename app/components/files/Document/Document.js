import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

class Document extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { fileId } = this.props;
    const { firestore } = this.context.store;
    firestore.setListener({
      collection: 'files',
      doc: fileId,
      storeAs: 'entries',
      subcollections: [{ collection: 'entries' }]
    })
  }

  render() {
    let { entries } = this.props;

    if (!entries) {
      return <ActivityIndicator />
    }

    // Format the entry 
    entries = Object.keys(entries).map((key) => {
      let entry = entries[key];
      return {
        id: key,
        ...entry
      }
    })
  
    return (
      <ScrollView style={styles.container}>
        {entries.map((entry, i) => {
          let { title, body } = entry;
          return (
            <View key={i} style={styles.entryContainer}>
              <Text style={styles.entryTitle}>{title}</Text>
              <Text style={styles.entryBody}>{body}</Text>
              <Text style={styles.messageText}>Last edited by Zac Holland TODO</Text>
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
  }
}

export default Document;
