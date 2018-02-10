import React from 'react';
import { AppRegistry, Text, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';

EStyleSheet.build({
  $black: 'black',
});

export default () => <Navigator onNavigationStateChange={null} />;
