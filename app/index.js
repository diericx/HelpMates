import React from 'react';
import { Dimensions, AsyncStorage } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import Font from 'expo';

import connect from './connect';

import { MainNavigation, AuthStack } from './config/routes';

// Build global stylesheet variables
EStyleSheet.build({
  $screenWidth: Dimensions.get('window').width,
  $black: 'black',
  $offBlack: 'rgb(60, 60, 60)',
  $lightgray: '#f3f3f3',
  $purple: '#cd84f1',
  $offWhite: 'rgb(252, 252, 252)',
  $offWhiteDown: 'rgb(247, 247, 247)',
  $lightBlue: '#18dcff',
  $lightBlueDown: '#76f2e7',
  $green: '#3ae374',
  $greenTrans: '#3ae37470',
  $red: '#ff4d4d',
  $orange: '#ff9f1a',
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
      OpenSansBold: require('../assets/fonts/OpenSansBold.ttf'),
      OpenSans: require('../assets/fonts/OpenSansRegular.ttf'),
    });

    connect();

    try {
      const value = await AsyncStorage.getItem('@MySuperStore:anonymousKey');
      if (value !== null) {
        // We have data!!
        console.log('Found anonymous key: ', value);
      } else {
        try {
          await AsyncStorage.setItem('@MySuperStore:anonymousKey', this.generateAnonymousKey());
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }

    this.setState({ isReady: true });
  }

  generateAnonymousKey() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
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
