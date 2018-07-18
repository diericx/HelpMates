import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import Chat from "../components/Chat";
import DocumentsForGroup from '../components/DocumentsForGroup';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

class Group extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    }

    // bindings
    this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
  }

  // Updates the selected index for the button group
  updateSelectedIndex(index) {
    this.setState({
      selectedIndex: index
    })
  }

  render() {
    const { selectedIndex } = this.state;

    const buttons = ["Chat", "Resources"]
    const groupId = this.props.navigation.getParam("groupId", null);

    onDocumentPress = (document) => {
      this.props.navigation.navigate('Resource', {
        resourceId: resource._id,
        resourceType: 'document'
      })
    }

    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateSelectedIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 30}}
        />
        {selectedIndex == 0 ? 
          <Chat groupId={groupId}> Here's your group1 </Chat>
        : 
          <DocumentsForGroup groupId={groupId} onPress={onDocumentPress} />
        }
        
      </View>
    );
  }
}

export default Group;