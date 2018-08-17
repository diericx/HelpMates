import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withFirebase } from 'react-redux-firebase'

import GroupList from '../components/groups/GroupList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  }
});

class Loading extends React.Component {

  // Subscribe to auth events on mount
  componentDidMount() {
    const { firebase } = this.props;

    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  // End the subscription when the component unmounts
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default withFirebase(Loading);