import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withFirebase, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux';

import GroupList from '../components/groups/GroupList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  }
});

@compose(
  firebaseConnect(),
  connect(({ firebase: { profile, auth } }) => ({
    auth
  }))
)
class WaitingForEmail extends React.Component {

  // Subscribe to auth events on mount
  componentDidMount() {
    const { firebase, auth } = this.props;
    // console.log(firebase.auth().currentUser.sendEmailVerification());
  }

  // // End the subscription when the component unmounts
  // componentWillUnmount() {
  //   this.authSubscription();
  // }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default WaitingForEmail;