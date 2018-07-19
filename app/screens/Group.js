import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import Chat from "../components/Chat";
import DocumentsForGroup from '../components/DocumentsForGroup';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroupContainer: {
    height: 30,
    width: '100%',
    marginLeft: -1,
    marginTop: -2,
    marginBottom: 0,
    padding: 0
  }
});

class Group extends React.Component {
  static navigationOptions = (props) => {
    const title = props.navigation.getParam("title", null);
    return {
      title
    }
  }

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
        title: document.title1,
        resourceId: document._id,
        resourceType: 'document'
      })
    }

    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateSelectedIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.buttonGroupContainer}
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