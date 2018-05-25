import React from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

// Auth
import AuthHome from '../screens/auth/AuthHome'
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
// Main App Screens
import Home from '../screens/Home';


export const AuthStack = StackNavigator({
  AuthHome: {
    screen: AuthHome,
  },
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp
  }
}, {
  headerMode: 'none',
});

export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
    },
  }
});

const styles = {
  icon: {
    height: 30,
    width: 30,
  },
};

export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  // Profile: {
  //   screen: ProfileStack,
  //   navigationOptions: {
  //     tabBarLabel: 'Profile',
  //   },
  // },
});