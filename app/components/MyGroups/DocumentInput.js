import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Avenir-Black',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: 25,
    color: '#0f0f0f',
    marginBottom: 5,
  },
  body: {
    fontFamily: 'Avenir-Light',
    lineHeight: 25,
    color: '#101010',
    fontSize: 17,
  },
  messageText: {
    fontFamily: 'Avenir-LightOblique',
    fontSize: 10,
    lineHeight: 12,
    color: 'lightgray',
  },
});

/**
 * The text input for a document. Simply takes in a document and then renders all
 * inputs necessary for that doc.
 */
const DocumentInput = ({ document, onChangeBody }) => {
  if (!document) {
    return null;
  }

  const { body, updatedBy } = document;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.body}
        multiline
        onChangeText={onChangeBody}
        placeholder="Body"
        value={body}
      />
      <Text style={styles.messageText}>Last edited by {updatedBy}</Text>
    </View>
  );
};

DocumentInput.propTypes = {
  document: PropTypes.object,
  onChangeBody: PropTypes.func,
};

DocumentInput.defaultProps = {
  onChangeBody: null,
};

export default DocumentInput;
