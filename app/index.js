import React from 'react';
import { Dimensions } from 'react-native';
import Meteor, { createContainer, View } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import Font from 'expo';

import connect from './connect';

import { MainNavigation, AuthStack } from './config/routes';

// Build global stylesheet variables
EStyleSheet.build({
  $screenWidth: Dimensions.get('window').width,
  $black: 'black',
  $purple: '#cd84f1',
  $offWhite: 'rgb(252, 252, 252)',
  $offWhiteDown: 'rgb(247, 247, 247)',
  $lightBlue: '#7efff5',
  $lightBlueDown: '#76f2e7',
  $green: '#32ff7e',
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }

  async componentWillMount() {
    // Import Assets
    await Expo.Font.loadAsync({
      Milkshake: require('../assets/fonts/Milkshake.ttf'),
      OpenSansLight: require('../assets/fonts/OpenSansLight.ttf'),
    });

    connect();

    this.setState({ isReady: true });
  }

  render() {
    const { user, loggingIn } = this.props;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    } else if (user == null) {
      return <AuthStack user={user} loggingIn={loggingIn} onNavigationStateChange={null} />;
    }
    return <MainNavigation onNavigationStateChange={null} />;
  }
}

export default createContainer(
  params => ({
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
  }),
  App,
);
