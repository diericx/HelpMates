import React from 'react';
import { StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import AuthIndexContainer from '../containers/Auth';
// Auth Screens
import AuthIndexScreen from '../scenes/Auth/index';
import AuthLoginScreen from '../scenes/Auth/login';
import AuthSignupScreen from '../scenes/Auth/signup';
// User Screens
import UsersChooseTimeSlotScreen from '../scenes/Users/chooseTimeSlot';
import UsersChooseTutorScreen from '../scenes/Users/chooseTutor';
import UsersProfileScreen from '../scenes/Users/profile';
// Course Screens
import CoursesChooseCourseScreen from '../scenes/Courses/chooseCourse';

const StudentStack = StackNavigator({
  ChooseCourse: {
    screen: CoursesChooseCourseScreen,
  },
  ChooseTutor: {
    screen: UsersChooseTutorScreen,
  },
  ChooseTimeSlot: {
    screen: UsersChooseTimeSlotScreen,
  },
});

const TutorStack = StackNavigator({
  Home: {
    screen: UsersProfileScreen,
  },
});

const ProfileStack = StackNavigator({
  Profile: {
    screen: UsersProfileScreen,
  },
});

export const MainNavigation = TabNavigator(
  {
    Student: {
      screen: StudentStack,
      navigationOptions: {
        tabBarLabel: 'Student',
      },
    },
    Tutor: {
      screen: TutorStack,
      navigationOptions: {
        tabBarLabel: 'Tutor',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Student') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
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
