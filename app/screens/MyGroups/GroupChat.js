import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Chat from "../../components/shared/Chat";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

class Group extends React.Component {
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