import React from 'react';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty  } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import { ListItem } from "react-native-elements";
import EStyleSheet from 'react-native-extended-stylesheet';

import NavigationService from '../../config/navigationService';
import NewFileModal from "./NewFileModal";
import NewFileButton from './NewFileButton';
import SepperatorView from '../shared/SepperatorView';
import EmptyList from '../shared/EmptyList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerText: {
    color: 'gray'
  },
  header: {
    justifyContent: 'center',
    // backgroundColor: '$lightgray',
    height: 45,
    paddingLeft: 15
  },
  subtitle: {
    color: 'gray',
    paddingVertical: 3,
    fontSize: 12
  }
});

// A FileList simply renders all of the files that are currently in the 
@compose(
  firestoreConnect((props) => {
    return ([
      {
        collection: 'files',
        where: ['parentId', '==', props.parentId],
        orderBy: ['title'],
        storeAs: `files-${props.parentId}`,
      }
    ])
  }),
  connect(({ firebase: { profile }, firestore }, props) => {
    return ({
      files: firestore.data[`files-${props.parentId}`],
      profile: profile
    })
  })
)
export default class FileList extends React.Component {
  constructor() {
    super();
    // bind
    this.newFile = this.newFile.bind(this);
  }

  state = {
    newFileModalIsVisible: false
  }

  onPress = (file) => {
    NavigationService.push('File', {
      title: file.title,
      fileId: file.id,
      fileType: file.type
    })
  }

  keyExtractor = (item, index) => item.id

  newFile(title, type) {
    const { firestore, profile, parentId } = this.props;
    firestore.add('files',
    {
      title,
      type,
      parentId,
      createdBy: profile.name,
      updatedBy: profile.name
    })
    this.setState({
      newFileModalIsVisible: false
    })
  }

  render() {
    let { files } = this.props;

    if (!isLoaded(files)) {
      return <ActivityIndicator />;
    }

    if (isEmpty(files)) {
      return <EmptyList centered text={'No files'}/>;
    }

    // Format the files
    formattedFiles = Object.keys(files).map((key) => {
      let file = files[key];
      return {
        id: key,
        ...file
      }
    })

    // Split files => Folders | OtherFiles
    let folders = []
    let otherFiles = []
    formattedFiles.forEach(file => {
      if (file.type === 'folder') {
        folders.push(file);
      } else {
        otherFiles.push(file);
      }
    });

    // Render
    return (
      <View style={styles.container}>
        <SectionList
          keyExtractor={this.keyExtractor}
          stickySectionHeadersEnabled={false}
          sections={[
            {title: 'Folders', data: folders},
            {title: 'Files', data: otherFiles},
          ]}
          renderSectionHeader={({section: {title, data}}) => data.length == 0 ? null : (
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
          )}
          renderItem={({item, index}) => {
            var leftIcon = { name: 'file-text', type: 'feather', size: 30, color: '#3f3f3f' };
            if (item.type == 'document') {
              leftIcon.type = 'material-community'
              leftIcon.name = 'file-document';
              leftIcon.color = '#17c0eb'
            } else if (item.type == 'folder') {
              leftIcon.name = 'folder';
              leftIcon.type = 'material-community'
              leftIcon.color = 'gray'
            }
            return (
              <SepperatorView renderTop={false} renderBottom={true}>
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
            )
          }}
        />

        <NewFileButton onPress={() => {
          this.setState({
            newFileModalIsVisible: true
          })
        }} />
        <NewFileModal 
          isVisible={this.state.newFileModalIsVisible}
          dismissModal={() => {
            this.setState({
              newFileModalIsVisible: false
            })
          }}
          onCreate={this.newFile}
        />
      </View>
    );
  }
}
