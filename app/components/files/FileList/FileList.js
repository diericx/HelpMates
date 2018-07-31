import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import SepperatorView from '../../SepperatorView';

import styles from './styles';

// A FileList simply renders all of the files that are currently in the 
class FileList extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { parentId } = this.props;
    const { firestore } = this.context.store;
    // Create store for files (folders, ocuments, images, etc.)
    firestore.setListener({
      collection: 'files',
      orderBy: ['title'],
      storeAs: `files-${parentId}`,
      where: ['parentId', '==', parentId],
    })
  }

  onPress = (file) => {
    this.props.navigation.push('File', {
      title: file.title,
      fileId: file.id,
      fileType: file.type
    })
  }

  keyExtractor = (item, index) => item.id

  render() {
    let { files } = this.props;

    if (!files) {
      return <ActivityIndicator />
    }

    // Format the files 
    files = Object.keys(files).map((key) => {
      let file = files[key];
      return {
        id: key,
        ...file
      }
    })

    // Split files => Folders | OtherFiles
    let folders = []
    let otherFiles = []
    files.forEach(file => {
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
            var leftIcon = { name: 'file-text', type: 'feather', size: 25, color: '#3f3f3f' };
            if (item.type == 'document') {
              leftIcon.name = 'file-text';
              leftIcon.color = '#17c0eb'
            } else if (item.type == 'folder') {
              leftIcon.name = 'folder';
              leftIcon.type = 'material-comunity'
              leftIcon.color = 'gray'
            }
            return (
              <SepperatorView renderTop={false} renderBottom={true}>
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={'TODO - Course subtitle'}
                  subtitleStyle={styles.subtitle}
                  containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
                  onPress={() => this.onPress(item)}
                  leftIcon={leftIcon}
                  chevron
                />
              </SepperatorView>
            )
          }
            
          }
        />
      </View>
    );
  }
}

export default withNavigation(FileList);
