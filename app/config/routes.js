import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/Auth';
import ChooseCourseScreen from '../screens/ChooseCourseScreen';
import ChooseTutorScreen from '../screens/ChooseTutorScreen';

const MainStack = StackNavigator(
  {
    ChooseCourse: {
      screen: ChooseCourseScreen,
    },
    ChooseTutor: {
      screen: ChooseTutorScreen,
    },
  },
  {
    initialRouteName: 'ChooseCourse',
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
