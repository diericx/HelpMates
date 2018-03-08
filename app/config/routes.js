import React from 'react';
import Meteor from 'react-native-meteor';
import { View, Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';
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
        const requestsRecieved = Meteor.collection('helpSessions').find({
          tutorAccepted: false,
          tutorId: Meteor.userId(),
        });
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
        return (
          <Ionicons name={iconName} size={35} color={tintColor} />
          // <IconBadge
          //   MainElement={
          //     <View
          //       style={{
          //         width: 30,
          //         margin: 6,
          //       }}
          //     >
          //       <Ionicons name={iconName} size={35} color={tintColor} />
          //     </View>
          //   }
          //   BadgeElement={<Text style={{ color: '#FFFFFF' }}>{requestsRecieved.length}</Text>}
          //   IconBadgeStyle={{
          //     width: 20,
          //     height: 20,
          //     backgroundColor: 'red',
          //   }}
          //   Hidden={9 === 0}
          // />
        );
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
