import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GroupList from '../../components/MyGroups/GroupList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  }
});

class MyGroupsList extends React.Component {
  static navigationOptions = {
    title: 'My Groups',
  };

  onPress = (group) => {
    this.props.navigation.navigate('Group', {
      groupId: group.id,
      title: group.title
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <GroupList onPress={this.onPress}/>
      </View>
    );
  }
}

export default MyGroupsList;