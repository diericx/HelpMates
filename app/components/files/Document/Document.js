import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TextInput, ActivityIndicator } from 'react-native';

import styles from './styles';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty  } from 'react-redux-firebase';
import { connect } from 'react-redux';

@compose(
  firestoreConnect((props) => {
    return ([
      {
        collection: 'files',
        doc: props.fileId,
        subcollections: [{ collection: 'entries'}],
        storeAs: `entries-${props.fileId}`
      }
    ])
  }),
  connect(({ firebase: { profile }, firestore }, props) => {
    return ({
      entries: firestore.data[`entries-${props.fileId}`],
      profile: profile
    })
  })
)
class Document extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
    super();
    // bind
    this.updateEntry = this.updateEntry.bind(this);
  }

  updateEntry(entry, delta) {
      const { firestore, profile, fileId } = this.props;
      firestore.update(
        {
          collection: 'files',
          doc: fileId,
          subcollections: [{ collection: 'entries', doc: entry.id }],
        },
        delta
      );
  }

  render() {
    let { entries, profile } = this.props;

    // Check to see if the entries have loaded yet
    if (!isLoaded(entries)) {
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
          let { title, body, updatedBy } = entry;
          return (
            <View key={i} style={styles.entryContainer}>
              <TextInput 
                style={styles.entryTitle}
                onChangeText={(text) => this.updateEntry(entry, { 
                  title: text,
                  updatedBy: profile.name
                })} 
              >
                {title}
              </TextInput>

              <TextInput 
                style={styles.entryBody}
                multiline={true}
                onChangeText={(text) => this.updateEntry(entry, { 
                  body: text,
                  updatedBy: profile.name
                })}
              >
                {body}
              </TextInput>
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
  }
}

export default Document;
