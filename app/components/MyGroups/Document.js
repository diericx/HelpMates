import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded  } from 'react-redux-firebase';
import { connect } from 'react-redux';

import DocumentInput from "../MyGroups/DocumentInput";


const styles = EStyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
});


@compose(
  firestoreConnect((props) => {
    return ([
      {
        collection: 'files',
        doc: props.fileId,
      }
    ])
  }),
  connect(({ firebase: { profile }, firestore: { data } }, props) => {
    return ({
      document: data.files ? data.files[props.fileId] : null,
      profile: profile
    })
  })
)
class Document extends React.Component {
  constructor() {
    super();
    // bind
    this.updateDocument = this.updateDocument.bind(this);
  }

  updateDocument(delta) {
      const { firestore, profile, fileId } = this.props;
      firestore.update(
        {
          collection: 'files',
          doc: fileId,
        },
        {
          ...delta,
          updatedBy: profile.name
        }
      );
  }

  render() {
    let { document } = this.props;

    // Check to see if the entries have loaded yet
    if (!isLoaded(document)) {
      return <ActivityIndicator />
    }

    return (
      <ScrollView style={styles.container}>
          <View style={styles.entryContainer}>
            <DocumentInput
              document={document}
              onChangeTitle={(title) => {
                this.updateDocument({ 
                  title,
                })
              }}
              onChangeBody={(body) => {
                this.updateDocument({ 
                  body,
                })
              }}
            />
          </View>
      </ScrollView>
    );
  }
}

export default Document;
