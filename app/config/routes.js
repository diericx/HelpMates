import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/Auth';
import HomeScreen from '../screens/Home';

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

// Root navigator
export default StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
  },
);
