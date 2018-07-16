import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';
import EStyleSheet from 'react-native-extended-stylesheet';

// Navigation
// import SwipeNav from "../components/navigation/SwipeNav";
import HomeScreen from "../screens/Home";
import MessagesScreen from "../screens/Messages";
import ChooseUniversity from "../screens/explore/ChooseUniversity"
import ChooseCourse from "../screens/explore/ChooseCourse"
import ChooseGroup from "../screens/explore/ChooseGroup"

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


const styles = EStyleSheet.create({
  exploreNavBar: {
    backgroundColor: "$lightblue"
  }
});


export const AuthStack = createStackNavigator({
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

export const ExploreStack = createStackNavigator({
  ChooseUniversity: {
    screen: ChooseUniversity
  },
  ChooseCourse: {
    screen: ChooseCourse
  },
  ChooseGroup: {
    screen: ChooseGroup
  }
},
{
  /* The header config from HomeScreen is now here */
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

export const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
})

export const TabNavigation = createBottomTabNavigator(
  {
    Explore: ExploreStack,
    Home: HomeStack,
    Messages: MessagesScreen,
  }
);