import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Font from 'expo';
import Navigator from './config/routes';

EStyleSheet.build({
  $black: 'black',
  $purple: '#cd84f1',
});

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Milkshake: require('../assets/fonts/Milkshake.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <Navigator onNavigationStateChange={null} />;
  }
}