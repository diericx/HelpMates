import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, withFirestore, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { UpdateDocument } from '../../lib/Firestore';

import DocumentInput from './DocumentInput';

const styles = EStyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
});

/**
 * Displays the view for a document. Documents are shared text files that users can
 * edit with live updates from other users.
 */
@compose(
  firestoreConnect(props => [
    {
      collection: 'files',
      doc: props.fileId,
    },
  ]),
  connect(({ firebase: { profile }, firestore: { data } }, props) => ({
    document: data.files ? data.files[props.fileId] : null,
    profile,
  })),
  withFirestore
)
class Document extends React.Component {
  render() {
    const { firestore, profile, document, fileId } = this.props;

    // Check to see if the entries have loaded yet
    if (!isLoaded(document)) {
      return <ActivityIndicator />;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.entryContainer}>
          <DocumentInput
            document={document}
            onChangeTitle={title => {
              UpdateDocument(firestore, profile, fileId, {
                title,
              });
            }}
            onChangeBody={body => {
              UpdateDocument(firestore, profile, fileId, {
                body,
              });
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

Document.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default Document;
