import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import Sepperator from '../../Sepperator';

import styles from './styles';

// A FileList simply renders all of the files that are currently in the 
class FileList extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { parentId } = this.props;
    const { firestore } = this.context.store;
    firestore.setListener({
      collection: 'files',
      where: ['parent', '==', parentId],
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

    // Format the documents 
    files = Object.keys(files).map((key) => {
      let document = files[key];
      return {
        id: key,
        ...document
      }
    })

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={files}
          renderItem={({item, index}) => {
            var iconName;
            if (item.type == 'document') {
              iconName = 'file-text';
            } else if (item.type == 'folder') {
              iconName = 'folder';
            }
            return (
              <View>
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={'TODO - Course subtitle'}
                  containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
                  onPress={() => this.onPress(item)}
                  leftIcon={{ name: iconName, type: 'feather', size: 25, color: '#3f3f3f' }}
                  chevron
                />
                <Sepperator />
              </View>
            )
          }
            
          }
        />
      </View>
    );
  }
}

export default withNavigation(FileList);
