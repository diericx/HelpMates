import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthIndexContainer from '../containers/Auth';
import CoursesIndexContainer from '../containers/Courses';
import { ChooseTutorContainer } from '../containers/Users';

export const MainStack = StackNavigator(
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

export const AuthStack = StackNavigator(
  {
    Auth: {
      screen: AuthIndexContainer,
    },
  },
  {
    headerMode: 'none',
  },
);

// Root navigator
// export default StackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//     },
//   },
//   {
//     headerMode: 'none',
//   },
// );
