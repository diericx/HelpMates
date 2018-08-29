import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from "react-native-elements";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import SepperatorView from "../../SepperatorView";
import ListViewSubtitle from '../../ListViewSubtitle';

import styles from './styles';

@compose(
  firestoreConnect((props) => {
    console.log(props.universityId)
    return  [
      {
        collection: 'courses',
        where: ['universityId', '==', props.universityId]
      }
    ]
  }),
  connect(({ firebase: { auth }, firestore }, props) => ({
    courses: firestore.ordered.courses,
    auth
  }))
)

export default class CourseList extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  keyExtractor = (item, index) => item.id

  JoinCourse(id) {
    let { firestore, auth } = this.props;
    let ref = firestore.collection('courses').doc(id)
    ref.set(
      {
        members: {
          [auth.uid]: true
        }
      },
      {merge: true}
    )
  }

  render() {
    let { courses, auth } = this.props;

    if (!courses) {
      return <ActivityIndicator />
    }

    console.log("Render courses")
    
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={courses}
          renderItem={({item, index}) => {
            let { members } = item;
            let isUserInCourse = !(members[auth.uid] == null);
            let headCount = Object.keys(members).length;

            return (
              <SepperatorView renderBottom={index==courses.length-1}>
                <ListItem
                  key={item.id}
                  // leftAvatar={{ source: { uri: l.avatar_url } }}
                  title={item.title}
                  subtitle={<ListViewSubtitle subtitle={item.subtitle} userCount={headCount} />}
                  rightTitle={
                    isUserInCourse ? null :
                    <Button
                      title='Unlock'
                      titleStyle={styles.title}
                      icon={
                        {
                          name: 'lock', 
                          size: 18, 
                          iconStyle: styles.icon
                        }
                      }
                      buttonStyle={styles.button}
                      onPress={() => this.JoinCourse(item.id) }
                    />
                  }
                  leftIcon={{name: 'book', size: 30, type: 'font-awesome'}}
                  onPress={isUserInCourse ? () => this.props.onPress(item) : null}
                  chevron={isUserInCourse}
                />
              </SepperatorView>
            )
          }}
        />
      </View>
    );
  }
}
