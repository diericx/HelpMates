import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import NavigationService from '../../config/navigationService';
import GroupList from '../../components/MyGroups/MyGroupsList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

@compose(
  // Connect first to feed auth into firestoreConnect
  connect(({ firebase: { auth } }) => ({
    auth,
  })),
  // Now that we have auth, use the UID
  firestoreConnect(({ auth }) => [
    {
      collection: 'groups',
      where: [`members.${[auth.uid]}`, '==', true],
    },
  ]),
  // Finally, setup final props
  connect(({ firestore }, { auth }) => ({
    courses: firestore.courses,
    groups: firestore.ordered.groups,
    auth,
  }))
)
class MyGroupsList extends React.Component {
  static navigationOptions = {
    title: 'My Groups',
  };

  onPress = group => {
    NavigationService.navigate('Group', {
      groupId: group.id,
      title: group.title,
    });
  };

  render() {
    const { groups } = this.props;

    if (!isLoaded(groups)) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={styles.container}>
        <GroupList groups={groups} onPress={this.onPress} />
      </View>
    );
  }
}

export default MyGroupsList;
