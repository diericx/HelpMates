import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

class DocumentList extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { groupId } = this.props;
    const { firestore } = this.context.store;
    firestore.setListener({
      collection: 'documents',
      where: ['groupId', '==', groupId],
    })
  }

  keyExtractor = (item, index) => item.id

  render() {
    let { documents } = this.props;

    if (!documents) {
      return <ActivityIndicator />
    }

    // Format the documents 
    documents = Object.keys(documents).map((key) => {
      let document = documents[key];
      return {
        id: key,
        ...document
      }
    })

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={documents}
          renderItem={({item, index}) => {
  
            return (
              <ListItem
                key={item.id}
                title={item.title}
                subtitle={'TODO - Course subtitle'}
                containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
                onPress={() => this.props.onPress(item)}
                chevron
              />
            )
          }
            
          }
        />
      </View>
    );
  }
}

export default DocumentList;
