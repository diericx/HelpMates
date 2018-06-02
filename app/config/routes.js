import React from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';

// Navigation
import SwipeNav from "../components/navigation/SwipeNav";

// Modals
import Chat from "../screens/Chat";

// Auth
import AuthHome from '../screens/auth/AuthHome'
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';


export const PageTitles = [
  "Courses",
  "People",
  "Messages"
]


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

export const MainStack = StackNavigator({
  Home: {
    screen: SwipeNav,
  },
  Chat: {
    screen: Chat,
  }
}, {
  headerMode: 'none',
});