import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';

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
  }))
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
        updatedBy: profile.name,
      }
    );
  }

  render() {
    const { document } = this.props;

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
              this.updateDocument({
                title,
              });
            }}
            onChangeBody={body => {
              this.updateDocument({
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
