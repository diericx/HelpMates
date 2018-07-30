import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import Chat from "../../components/Chat";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

class Group extends React.Component {
  static navigationOptions = (props) => {
    return {
      tabBarLabel: 'Chat'
    }
  }

  render() {
    const groupId = this.props.navigation.getParam("groupId", null);

    return (
      <View style={styles.container}>
          <Chat groupId={groupId}> Here's your group1 </Chat>
      </View>
    );
  }
}

export default Group;