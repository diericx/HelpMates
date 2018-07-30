import React from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Icon, Avatar } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import EStyleSheet from 'react-native-extended-stylesheet';

// Navigation
// import SwipeNav from "../components/navigation/SwipeNav";
import HomeScreen from "../screens/Home";
import FileScreen from "../screens/File";

// Group
import GroupChatScreen from "../screens/group/GroupChat";
import GroupFilesScreen from "../screens/group/GroupFiles";

import MessagesScreen from "../screens/Messages";
import ChooseUniversityScreen from "../screens/explore/ChooseUniversity"
import ChooseCourseScreen from "../screens/explore/ChooseCourse"
import ChooseGroupScreen from "../screens/explore/ChooseGroup"

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
  },
  avatar: {
    marginTop: 100
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
  ChooseUniversity: ChooseUniversityScreen,
  ChooseCourse: ChooseCourseScreen,
  ChooseGroup: ChooseGroupScreen
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
      height: 70,
      borderBottomWidth: 0
    },
    headerRight: (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center', 
        marginLeft: 0, 
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginRight: 10
      }}> 
        <Avatar
          size={50}
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
    )
  },
})

const groupTabNavigator = createMaterialTopTabNavigator({
  GroupChat: {
    screen: GroupChatScreen,
    tabBarLabel: "asdf"
  },
  GroupFiles: {
    screen: GroupFilesScreen
  }
},
{
  tabBarOptions: {
    tabStyle: {
      height: 40,
      padding: 0
    },
    style: {
      backgroundColor: 'white',
    },
    labelStyle: {
      color: 'black',
    }
  }
})

export const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Group: {
    screen: groupTabNavigator,
    navigationOptions: (props) => ({
      title: props.navigation.getParam("title", null)
    })
  },
  File: {
    screen: FileScreen,
    navigationOptions: {
      headerStyle: {
        height: 70,
        borderBottomWidth: 0,
        backgroundColor: 'white'
      },
    }
  },
},
{
  navigationOptions: {
    headerStyle: {
      height: 70,
      borderBottomWidth: 0,
      backgroundColor: 'white'
    },
    headerRight: (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center', 
        marginLeft: 0, 
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginRight: 10
      }}> 
        <Avatar
          size={50}
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
    )
  },
})

export const TabNavigation = createBottomTabNavigator(
  {
    Explore: ExploreStack,
    Home: HomeStack,
    Help: MessagesScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType = 'material-community';
        if (routeName === 'Explore') {
          iconName = 'wpexplorer';
          iconType = 'font-awesome';
        } else if (routeName === 'Home') {
          iconName = 'group';
          iconType = 'font-awesome';
        } else if (routeName == 'Help') {
          iconName = 'life-bouy';
          iconType = 'font-awesome';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} type={iconType} size={30} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'white'
      }
    }
  }
);