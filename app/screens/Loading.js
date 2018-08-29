import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  }
});

@compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({
    auth
  }))
)
class Loading extends React.Component {

  // Subscribe to auth events on mount
  componentDidMount() {
    const { firebase } = this.props;

    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (user) {
        if (user.emailVerified) {
          this.props.navigation.navigate('App');
        } else {
          this.props.navigation.navigate('WaitingForEmail');
        }
      } else {
        this.props.navigation.navigate('Auth');
      }
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

export default Loading;
// export default connect(({ firebase: { profile } }) => ({ profile }))(Loading)