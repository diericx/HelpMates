import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Chat from '../../components/shared/Chat/Chat';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

class Group extends React.Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Chat',
  });

  render() {
    return <View style={styles.container} />;
  }
}

export default Group;
