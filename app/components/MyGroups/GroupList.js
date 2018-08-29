import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirebase, firebaseConnect } from 'react-redux-firebase';
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

@compose(
  connect(({ firebase: { auth } }) => ({
    auth,
  })),
  firestoreConnect(({ courseId, auth }) => {
    const path = `members.${[auth.uid]}`;
    const whereQuery = courseId ? ['courseId', '==', courseId] : [path, '==', true];
    return [
      {
        collection: 'groups',
        where: whereQuery,
      },
    ];
  }),
  connect(({ firestore }, { auth }) => ({
    courses: firestore.courses,
    groups: firestore.ordered.groups,
    auth,
  }))
)
export default class GroupList extends React.Component {
  JoinGroup(groupId) {
    const { firestore, auth } = this.props;
    const path = `members.${[auth.uid]}`;
    firestore
      .collection('groups')
      .doc(groupId)
      .update({
        [path]: true,
      });
  }

  LeaveGroup(groupId) {
    const { firestore, auth } = this.props;
    const path = `members.${[auth.uid]}`;
    firestore
      .collection('groups')
      .doc(groupId)
      .update({
        [path]: firestore.FieldValue.delete(),
      });
  }

  render() {
    const { groups, onPress, auth } = this.props;

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
              <SepperatorView renderTop={index == 0} renderBottom={index == groups.length - 1}>
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
                    onPress == null ? (
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
                    ) : null
                  }
                  onPress={onPress == null ? null : () => onPress(item)}
                  chevron={!(onPress == null)}
                />
              </SepperatorView>
            );
          }}
        />
      </View>
    );
  }
}
