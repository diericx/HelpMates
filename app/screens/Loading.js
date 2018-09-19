import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CheckNotificationStatus } from '../lib/Utils';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

@compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile,
  }))
)
class Loading extends React.Component {
  state = {
    emailVerified: true,
  };

  // Subscribe to auth events on mount
  componentDidMount() {
    const { firebase, navigation } = this.props;

    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (user) {
        if (user.emailVerified) {
          this.setState({ emailVerified: true });
        } else {
          navigation.navigate('WaitingForEmail');
        }
      } else {
        navigation.navigate('Auth');
      }
    });
  }

  componentWillReceiveProps = async nextProps => {
    // We only check for props if the user has confirmed their email. We do this to make
    //   sure all auth data has loaded BEFORE sending them to the
    // Doing this allows us to assume that the app has these props for every screen
    const { emailVerified } = this.state;
    const { navigation } = this.props;
    if (!emailVerified) {
      return;
    }

    // Check to see if all core auth data is loaded
    if (this.isCoreAuthDataLoaded(nextProps)) {
      // Now that we know the user is signed in, AND that the core props are loaded,
      //  call some simple setup functions for things like push notifications
      await CheckNotificationStatus(nextProps.firebase, nextProps.profile);
      navigation.navigate('App');
    }
  };

  // End the subscription when the component unmounts
  componentWillUnmount() {
    this.authSubscription();
  }

  /**
   * Checks to see if specified core auth data is loaded.
   * @param {object} props - Take in props because we will be checking before props make it to the component
   */
  isCoreAuthDataLoaded = props => {
    const { auth, profile } = props;
    return isLoaded(auth) && isLoaded(profile);
  };

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
