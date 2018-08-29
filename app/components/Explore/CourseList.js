import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { firestoreConnect } from 'react-redux-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { compose } from 'redux';

import SepperatorView from '../shared/SepperatorView';
import ListViewSubtitle from '../shared/ListViewSubtitle';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '$green',
    marginLeft: -8,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '$green',
  },
  icon: {
    color: '$green',
  },
});

@compose(
  firestoreConnect(props => [
    {
      collection: 'courses',
      where: ['universityId', '==', props.universityId],
    },
  ]),
  connect(({ firebase: { auth }, firestore }) => ({
    courses: firestore.ordered.courses,
    auth,
  }))
)
export default class CourseList extends React.Component {
  keyExtractor = item => item.id;

  JoinCourse(id) {
    const { firestore, auth } = this.props;
    const ref = firestore.collection('courses').doc(id);
    ref.set(
      {
        members: {
          [auth.uid]: true,
        },
      },
      { merge: true }
    );
  }

  render() {
    const { courses, auth, onPress } = this.props;

    if (!courses) {
      return <ActivityIndicator />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={courses}
          renderItem={({ item, index }) => {
            const { members } = item;
            const isUserInCourse = !(members[auth.uid] == null);
            const headCount = Object.keys(members).length;

            return (
              <SepperatorView renderBottom={index == courses.length - 1}>
                <ListItem
                  key={item.id}
                  // leftAvatar={{ source: { uri: l.avatar_url } }}
                  title={item.title}
                  subtitle={<ListViewSubtitle subtitle={item.subtitle} userCount={headCount} />}
                  rightTitle={
                    isUserInCourse ? null : (
                      <Button
                        title="Unlock"
                        titleStyle={styles.title}
                        icon={{
                          name: 'lock',
                          size: 18,
                          iconStyle: styles.icon,
                        }}
                        buttonStyle={styles.button}
                        onPress={() => this.JoinCourse(item.id)}
                      />
                    )
                  }
                  leftIcon={{ name: 'book', size: 30, type: 'font-awesome' }}
                  onPress={isUserInCourse ? () => onPress(item) : null}
                  chevron={isUserInCourse}
                />
              </SepperatorView>
            );
          }}
        />
      </View>
    );
  }
}
