import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/Auth';
import ChooseCourseScreen from '../screens/ChooseCourseScreen';

const MainStack = StackNavigator(
  {
    Home: {
      screen: ChooseCourseScreen,
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
