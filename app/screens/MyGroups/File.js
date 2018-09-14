import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Image } from 'react-native-expo-image-cache';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';

import Document from '../../components/MyGroups/Document';
import FileList from '../../components/MyGroups/FileList';
import { validate } from '../../lib/Utils';
import NavigationService from '../../config/navigationService';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  white: {
    backgroundColor: 'white',
  },
  black: {
    backgroundColor: 'black',
    flex: 1,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  },
});

@compose(
  firestoreConnect(({ navigation }) => {
    // Get groupId from navigation params
    const fileId = navigation.getParam('fileId', null);
    const fileType = navigation.getParam('fileType', null);
    validate(
      'GroupChat.firestoreConnect() groupId should exist as a nav param. ',
      fileId,
      fileType
    );

    // If this is a folder, get all the files in this folder
    if (fileType === 'folder') {
      return [
        {
          collection: 'files',
          where: ['parentId', '==', fileId],
          orderBy: ['title'],
          storeAs: `files-${fileId}`,
        },
      ];
    }

    // If it's a document or image, just get the data for this single file
    if (fileType === 'document' || fileType === 'image') {
      return [
        {
          collection: 'files',
          doc: fileId,
        },
      ];
    }

    // If this is undetected, no query
    return [];
  }),
  connect(({ firestore: { data } }, { navigation }) => {
    // Get groupId from navigation params
    const fileId = navigation.getParam('fileId', null);
    const fileType = navigation.getParam('fileType', null);
    validate('GroupChat.connect() groupId should exist as a nav param. ', fileId, fileType);
    return {
      fileId,
      fileType,
      file: data.files && data.files[fileId],
      files: data[`files-${fileId}`],
    };
  })
)
class File extends React.Component {
  // Title is passed in from FileList as the file.title property
  static navigationOptions = props => ({
    title: props.navigation.getParam('title', null),
  });

  render() {
    const { fileId, fileType, file, files } = this.props;

    // Wait for the appropriate data to load
    if (fileType === 'document' || fileType === 'image') {
      if (!isLoaded(file)) {
        return <ActivityIndicator size="large" />;
      }
    } else if (fileType === 'folder') {
      if (!isLoaded(files)) {
        return <ActivityIndicator size="large" />;
      }
    }

    // Render document
    if (fileType === 'document') {
      return (
        <View style={[styles.container, styles.white]}>
          <Document fileId={fileId} />
        </View>
      );
    }
    // Render image
    if (fileType === 'image') {
      console.log('File.js THIS SHOULD NOT HAPPEN');
      return null;
    }
    // Render folder
    if (fileType === 'folder') {
      return (
        <View style={[styles.container]}>
          <FileList parentId={fileId} />
        </View>
      );
    }

    return null;
  }
}

export default File;
