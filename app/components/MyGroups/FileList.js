import React from 'react';
import { compose } from 'redux';
import {
  firestoreConnect,
  withFirestore,
  isLoaded,
  isEmpty,
  withFirebase,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Modal,
  SectionList,
  ActivityIndicator,
  Alert,
  ActionSheetIOS,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ImagePicker, Permissions } from 'expo';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Image } from 'react-native-expo-image-cache';

import { NewFile, UploadImage } from '../../lib/Firestore';
import FileModalFooter from './FileModalFooter';
import NavigationService from '../../config/navigationService';
import NewFileModal from './NewFileModal';
import NewFileButton from './NewFileButton';
import SepperatorView from '../shared/SepperatorView';
import EmptyList from '../shared/EmptyList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerText: {
    color: 'gray',
  },
  header: {
    justifyContent: 'center',
    // backgroundColor: '$lightgray',
    height: 45,
    paddingLeft: 15,
  },
  subtitle: {
    color: 'gray',
    paddingVertical: 3,
    fontSize: 12,
  },
});

// A FileList simply renders all of the files that are currently in the
@compose(
  firestoreConnect(props => [
    {
      collection: 'files',
      where: ['parentId', '==', props.parentId],
      orderBy: ['title'],
      storeAs: `files-${props.parentId}`,
    },
  ]),
  connect(({ firebase: { profile }, firestore }, props) => ({
    files: firestore.data[`files-${props.parentId}`],
    profile,
  })),
  withFirestore,
  withFirebase
)
export default class FileList extends React.Component {
  state = {
    newFileModalIsVisible: false,
    imagesModalIsVisible: false,
    imagesModalIndex: 0,
  };

  onPress = file => {
    if (file.type === 'image') {
      const indexOfImage = this.getIndexForImageFile(file);
      this.setState({ imagesModalIsVisible: true, imagesModalIndex: indexOfImage });
      return;
    }
    NavigationService.push('File', {
      title: file.title,
      fileId: file.id,
      fileType: file.type,
    });
  };

  keyExtractor = item => item.id;

  showNoCameraPermissionsAlert = () => {
    Alert.alert(
      'No Camera Roll Access',
      'You will need to allow Camera access in Settings for HelpMates to upload photos.',
      [{ text: 'OK', onPress: () => console.log('showNoCameraPermissionsAlert(): OK Pressed') }],
      { cancelable: false }
    );
  };

  showFileTitleAlreadyExistsAlert = () => {
    Alert.alert(
      'A file with that name already exists in this folder!',
      'Try calling it something else.',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  /**
   * Checks the current file list to see if any files already exist with the given
   *   title to stop duplicates.
   * @param {string} title - title that we are checking to see if already exists
   */
  doesFileTitleAlreadyExistInList = title => {
    const sanitizedTitle = title.toLowerCase();
    const { files } = this.props;
    let foundMatch = false;
    Object.keys(files).forEach(key => {
      if (files[key].title.toLowerCase() === sanitizedTitle) {
        foundMatch = true;
      }
    });
    return foundMatch;
  };

  /**
   * Takes info given from the newFileModal and decides how to create a
   *   new file. Some files are created differently or need extra input
   *   from the user so this function handles that.
   * @param title - title of the file. Passed down from NewFileModal
   * @param type - type of the file. Passed down from NewFileModal
   */
  onCreateFileBtnPress = async (title, type) => {
    console.log('onCreateFileBtnPress(): ', title, type);
    const { firestore, firebase, profile, parentId } = this.props;
    // Make sure a file with this name doesn't already exist
    if (this.doesFileTitleAlreadyExistInList(title)) {
      this.showFileTitleAlreadyExistsAlert();
      return false;
    }
    if (type === 'folder' || type === 'document') {
      // If the type is a folder or file, it doesn't need any extra data,
      //  so simply create the file with a title and type.
      NewFile(firestore, profile, parentId, title, type);
      return true;
    }
    if (type === 'image') {
      const camStatus = (await Permissions.askAsync(Permissions.CAMERA)).status;
      const rollStatus = (await Permissions.askAsync(Permissions.CAMERA_ROLL)).status;
      const hasCameraPermission = camStatus === 'granted' && rollStatus === 'granted';
      // Show a modal if we don't have camera permission
      if (!hasCameraPermission) {
        this.showNoCameraPermissionsAlert();
        return false;
      }
      // If we do have permission, get a photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.8,
      });
      // Check if the user cancelled the image pick
      if (result.cancelled) {
        return false;
      }
      // Upload the photo to Firebase, get the storage uri and preview
      const imageData = await UploadImage(title, result.uri, firebase);
      // Create the file relative to this group
      NewFile(firestore, profile, parentId, title, type, imageData);
      return true;
    }
    // If all else has failed return false
    return false;
  };

  showImageOptionsActionSheet = () => {
    const options = ['Save Image', 'Report Image', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    ActionSheetIOS.showActionSheetWithOptions({ options, cancelButtonIndex }, buttonIndex => {
      if (options[buttonIndex] === 'Save Image') {
        console.log('TODO: SAVE IMAGE');
      } else if (options[buttonIndex] === 'Report Image') {
        console.log('TODO: REPORT IMAGe');
      }
    });
  };

  /**
   * Will get only the images from a file list and format them to fit within
   * the parameters of the modal.
   */
  getAndFormatImageFiles = () => {
    const { files } = this.props;
    if (isEmpty(files)) {
      return [];
    }
    // files is an object, so iterate over it like so
    const keys = Object.keys(files);
    const imageKeys = keys.filter(key => files[key].type === 'image');
    // We can now assume these keys are all images
    return imageKeys.map(key => {
      const file = files[key];
      return {
        url: file.uri,
        props: { preview: { uri: file.preview } },
      };
    });
  };

  getIndexForImageFile = file => {
    const { files } = this.props;
    const keys = Object.keys(files);
    const imageKeys = keys.filter(key => files[key].type === 'image');
    for (let i = 0; i < imageKeys.length; i += 1) {
      if (imageKeys[i] === file.id) {
        return i;
      }
    }
    return 0;
  };

  // Takes in files from props and formats them to be displayed correctly
  formatAndSortFiles() {
    const { files } = this.props;
    const formattedFiles = Object.keys(files).map(key => {
      const file = files[key];
      return {
        id: key,
        ...file,
      };
    });
    // Split files => Folders | OtherFiles
    const folders = [];
    const otherFiles = [];
    formattedFiles.forEach(file => {
      if (file.type === 'folder') {
        folders.push(file);
      } else {
        otherFiles.push(file);
      }
    });
    // Return the sorted sections
    return { folders, otherFiles };
  }

  // Helper function that renders the list (because it's so long and we need
  //  logic in render)
  renderList() {
    const { folders, otherFiles } = this.formatAndSortFiles();
    return (
      <SectionList
        keyExtractor={this.keyExtractor}
        stickySectionHeadersEnabled={false}
        sections={[{ title: 'Folders', data: folders }, { title: 'Files', data: otherFiles }]}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length == 0 ? null : (
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
          )
        }
        renderItem={({ item, index }) => {
          const leftIcon = { name: 'file-text', type: 'feather', size: 30, color: '#3f3f3f' };
          if (item.type === 'document') {
            leftIcon.type = 'material-community';
            leftIcon.name = 'file-document';
            leftIcon.color = '#17c0eb';
          } else if (item.type === 'folder') {
            leftIcon.name = 'folder';
            leftIcon.type = 'material-community';
            leftIcon.color = 'gray';
          } else if (item.type === 'image') {
            leftIcon.name = 'file-image';
            leftIcon.type = 'material-community';
            leftIcon.color = '#78e08f';
          }
          return (
            <SepperatorView renderTop={false} renderBottom>
              <ListItem
                key={item.id}
                title={item.title}
                subtitle={item.updatedBy == null ? null : `Last updated by ${item.updatedBy}`}
                subtitleStyle={styles.subtitle}
                containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
                onPress={() => this.onPress(item)}
                leftIcon={leftIcon}
                chevron
              />
            </SepperatorView>
          );
        }}
      />
    );
  }

  render() {
    const { firestore, profile, files, parentId } = this.props;
    const { newFileModalIsVisible, imagesModalIsVisible, imagesModalIndex } = this.state;

    if (!isLoaded(files)) {
      return <ActivityIndicator />;
    }

    // Now that we know the files are loaded, get just the images for the modal
    const imagesOnly = this.getAndFormatImageFiles();

    // Render
    return (
      <View style={styles.container}>
        {// Only render the list if there are files here
        isEmpty(files) ? <EmptyList centered text="No files" /> : this.renderList()}

        <NewFileButton
          onPress={() => {
            this.setState({
              newFileModalIsVisible: true,
            });
          }}
        />
        <NewFileModal
          isVisible={newFileModalIsVisible}
          dismissModal={() => {
            this.setState({
              newFileModalIsVisible: false,
            });
          }}
          onCreate={this.onCreateFileBtnPress}
        />

        <Modal visible={imagesModalIsVisible} transparent>
          <ImageViewer
            imageUrls={imagesOnly}
            renderImage={props => {
              const {
                style: { width, height },
                source: { uri },
                preview,
              } = props;
              return <Image style={{ height, width }} {...{ preview, uri }} />;
            }}
            renderFooter={() => <FileModalFooter onPress={this.showImageOptionsActionSheet} />}
            index={imagesModalIndex}
            enableSwipeDown
            onCancel={() => this.setState({ imagesModalIsVisible: false })}
          />
        </Modal>
      </View>
    );
  }
}
