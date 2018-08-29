import React from 'react';
import { View, Text, TextInput } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginBottom: 20
  },
  title: {
    fontFamily: 'Avenir-Black',
    fontWeight: "bold",
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
  }
});

export default DocumentInput = (props) => {
  // parse props
  const {
    document,
    onChangeTitle,
    onChangeBody
  } = props;

  if (!document) {
    return null;
  }

  const {
    title,
    body,
    updatedBy
  } = document;
  // render
  return (
    <View style={styles.container}>
      {/* <TextInput 
        style={styles.title}
        onChangeText={onChangeTitle} 
        placeholder={"Title"}
        value={title}
      /> */}

      <TextInput 
        style={styles.body}
        multiline={true}
        onChangeText={onChangeBody}
        placeholder={"Body"}
        value={body}
      />
      <Text style={styles.messageText}>Last edited by {updatedBy}</Text>

    </View>
  )
}