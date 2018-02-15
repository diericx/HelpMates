import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

// import AuthIndexContainer from '../containers/Auth';
import AuthIndexScreen from '../scenes/Auth/index';
import AuthLoginScreen from '../scenes/Auth/login';
import AuthSignupScreen from '../scenes/Auth/signup';

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

export const AuthStack = StackNavigator({
  Index: {
    screen: AuthIndexScreen,
  },
  Login: {
    screen: AuthLoginScreen,
  },
  Signup: {
    screen: AuthSignupScreen,
  },
});

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
