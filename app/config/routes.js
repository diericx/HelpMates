import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthIndexContainer from '../containers/Auth';
import CoursesIndexContainer from '../containers/Courses';
import { ChooseTutorContainer } from '../containers/Users';

const MainStack = StackNavigator(
  {
    ChooseCourse: {
      screen: CoursesIndexContainer,
    },
    ChooseTutor: {
      screen: ChooseTutorContainer,
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
      screen: AuthIndexContainer,
    },
  },
  {
    initialRouteName: 'Auth',
    mode: 'modal',
    headerMode: 'none',
  },
);
