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
import UsersShowScreen from '../scenes/Users/show';
import UsersProfileScreen from '../scenes/Users/profile';
// Tutor Screens
import TutorAvailabilityScreen from '../scenes/Tutor/availability';
import TutorCoursesScreen from '../scenes/Tutor/courses';
// Course Screens
import CoursesShowScreen from '../scenes/Courses/show';
// Help Session Request
import HelpSessionIndexScreen from '../scenes/HelpSession/index';
import HelpSessionShowScreen from '../scenes/HelpSession/show';
// Search Screens
import SearchIndex from '../scenes/Search/index';

const ShowUserStack = StackNavigator(
  {
    Show: {
      screen: UsersShowScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const ShowCourseStack = StackNavigator(
  {
    Show: {
      screen: CoursesShowScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const StudentStack = StackNavigator({
  Search: {
    screen: SearchIndex,
  },
  ShowUser: {
    screen: ShowUserStack,
  },
  ShowCourse: {
    screen: ShowCourseStack,
  },
});

const ProfileStack = StackNavigator({
  Profile: {
    screen: UsersProfileScreen,
  },
  Availability: {
    screen: TutorAvailabilityScreen,
  },
  Courses: {
    screen: TutorCoursesScreen,
  },
});

const HelpSessionStack = StackNavigator({
  Index: {
    screen: HelpSessionIndexScreen,
  },
  Show: {
    screen: HelpSessionShowScreen,
  },
});

export const MainNavigation = TabNavigator(
  {
    GetHelp: {
      screen: StudentStack,
      navigationOptions: {
        tabBarLabel: 'Get Help',
      },
    },
    Sessions: {
      screen: HelpSessionStack,
      navigationOptions: {
        tabBarLabel: 'Sessions',
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
        if (routeName === 'GetHelp') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Sessions') {
          iconName = `ios-send${focused ? '' : '-outline'}`;
        } else if (routeName == 'Tutor') {
          iconName = `ios-cash${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={35} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
    },
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
