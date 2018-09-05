import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';

import SepperatorView from '../shared/SepperatorView';
import ListViewSubtitle from '../shared/ListViewSubtitle';
import EmptyList from '../shared/EmptyList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  buttonTitle: {
    color: '$lightblue',
    marginLeft: -8,
  },
  button: {
    backgroundColor: 'white',
  },
  icon: {
    color: '$lightblue',
    padding: 0,
    margin: 0,
  },
});

/**
 * Displays a list of groups that the user can potentially unlock. Requires
 * access to auth and firestore in order to call queries with the current
 * user's auth uid.
 */
@compose(
  withFirestore,
  connect(({ firebase: { auth } }) => ({
    auth,
  }))
)
class CourseGroupsList extends React.Component {
  /**
   * Adds the currently signed in user to the specified group
   * @param {string} groupId - ID of the group that you wish to join
   */
  JoinGroup(groupId) {
    const { firestore, auth } = this.props;
    firestore.update(
      {
        collection: 'groups',
        doc: groupId,
      },
      {
        [`members.${auth.uid}`]: true,
      }
    );
  }

  /**
   * Removes the currently signed in user to the specified group
   * @param {string} groupId - ID of the group that you wish to leave
   */
  LeaveGroup(groupId) {
    const { firestore, auth } = this.props;
    firestore.update(
      {
        collection: 'groups',
        doc: groupId,
      },
      {
        [`members.${auth.uid}`]: firestore.FieldValue.delete(),
      }
    );
  }

  render() {
    const { groups, auth } = this.props;

    if (!groups) {
      return <ActivityIndicator />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          data={groups}
          ListEmptyComponent={
            <EmptyList
              centered
              text={
                "You aren't in any groups! \n\nGo to the Explore tab to find your courses and join some groups"
              }
            />
          }
          renderItem={({ item, index }) => {
            const { members } = item;

            const isUserInGroup = !(members[auth.uid] == null);
            const headCount = Object.keys(members).length;

            return (
              <SepperatorView renderTop={index === 0} renderBottom={index === groups.length - 1}>
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={
                    <ListViewSubtitle subtitle="TODO - Course Title" userCount={headCount} />
                  }
                  leftIcon={{
                    name: 'verified-user',
                    size: 35,
                    iconStyle: styles.icon,
                  }}
                  rightTitle={
                    <Button
                      title=""
                      // titleStyle={styles.buttonTitle}
                      icon={{
                        name: isUserInGroup ? 'highlight-off' : 'add-circle-outline',
                        size: 35,
                        color: 'black',
                      }}
                      buttonStyle={styles.button}
                      onPress={
                        isUserInGroup
                          ? () => this.LeaveGroup(item.id)
                          : () => this.JoinGroup(item.id)
                      }
                    />
                  }
                />
              </SepperatorView>
            );
          }}
        />
      </View>
    );
  }
}

export default CourseGroupsList;
