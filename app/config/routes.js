import React from 'react';
import { View, Text, Image } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { Icon, Avatar } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

// Initial entry point
import LoadingScreen from '../screens/Loading';

// Auth screen collection
import AuthHomeScreen from '../screens/Auth/AuthHome';
import LoginScreen from '../screens/Auth/Login';
import SignUpScreen from '../screens/Auth/SignUp';
import ChooseUniversityScreen from '../screens/Auth/ChooseUniversity';
import WaitingForEmailScreen from '../screens/Auth/WaitingForEmail';

// Explore screen collection
import ChooseCourseScreen from '../screens/Explore/ChooseCourse';
import ChooseGroupScreen from '../screens/Explore/ChooseGroup';

// MyGroups screen collection
import MyGroupsListScreen from '../screens/MyGroups/MyGroupsList';
import GroupChatScreen from '../screens/MyGroups/GroupChat';
import GroupFilesScreen from '../screens/MyGroups/GroupFiles';
import FileScreen from '../screens/MyGroups/File';

// Help screen collection
import HelpChatScreen from '../screens/Help/HelpChat';

// Shared
import ProfileScreen from '../screens/shared/Profile';

const styles = EStyleSheet.create({
  exploreNavBar: {
    backgroundColor: '$lightblue',
  },
  avatar: {
    marginTop: 100,
  },
});

// ---------
// AUTH
// ---------

export const SignUpStack = createStackNavigator(
  {
    ChooseUniversity: ChooseUniversityScreen,
    SignUp: SignUpScreen,
  },
  {
    headerMode: 'none',
  }
);

export const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    headerMode: 'none',
  }
);

// ---------
// ROOT
// ---------

export const ExploreStack = createStackNavigator(
  {
    ChooseCourse: ChooseCourseScreen,
    ChooseGroup: ChooseGroupScreen,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        height: 70,
        borderBottomWidth: 0,
      },
      headerRight: (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 0,
            backgroundColor: 'white',
            width: 50,
            height: 50,
            marginRight: 10,
          }}
        >
          <Avatar
            size={50}
            rounded
            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
        </View>
      ),
    },
  }
);

const groupTabNavigator = createMaterialTopTabNavigator(
  {
    GroupChat: {
      screen: GroupChatScreen,
      navigationOptions: {
        title: 'Chat',
      },
    },
    GroupFiles: {
      screen: GroupFilesScreen,
      navigationOptions: {
        title: 'Files',
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        height: 40,
        padding: 0,
      },
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        color: 'black',
      },
      indicatorStyle: {
        backgroundColor: '#17c0eb',
      },
    },
  }
);

export const MyGroupsStack = createStackNavigator(
  {
    MyGroupsList: {
      screen: MyGroupsListScreen,
    },
    Group: {
      screen: groupTabNavigator,
      navigationOptions: props => ({
        title: props.navigation.getParam('title', null),
      }),
    },
    File: {
      screen: FileScreen,
      navigationOptions: {
        headerStyle: {
          height: 70,
          borderBottomWidth: 0,
          backgroundColor: 'white',
        },
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        height: 70,
        borderBottomWidth: 0,
        backgroundColor: 'white',
      },
      headerRight: (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 0,
            backgroundColor: 'white',
            width: 50,
            height: 50,
            marginRight: 10,
          }}
        >
          <Avatar
            size={50}
            rounded
            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            onPress={() => navigation.navigate('ProfileModal')}
            activeOpacity={0.7}
          />
        </View>
      ),
    }),
  }
);

export const HelpStack = createStackNavigator(
  {
    HelpChat: HelpChatScreen,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        height: 70,
        borderBottomWidth: 0,
      },
      headerRight: (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 0,
            backgroundColor: 'white',
            width: 50,
            height: 50,
            marginRight: 10,
          }}
        >
          <Avatar
            size={50}
            rounded
            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
        </View>
      ),
    },
  }
);

export const TabNavigation = createBottomTabNavigator(
  {
    Explore: ExploreStack,
    MyGroups: MyGroupsStack,
    Help: HelpStack,
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
        } else if (routeName === 'MyGroups') {
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
        backgroundColor: 'white',
      },
      activeTintColor: '#18dcff',
    },
  }
);

// --------
// EXTERNAL STACKS
// --------

const AuthStack = createStackNavigator(
  {
    Home: {
      screen: AuthHomeScreen,
    },
    Login: {
      screen: LoginStack,
    },
    SignUp: {
      screen: SignUpStack,
    },
  },
  {
    headerMode: 'none',
  }
);

const AppStack = createStackNavigator(
  {
    Main: {
      screen: TabNavigation,
    },
    ProfileModal: {
      screen: ProfileScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export const RootStack = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    WaitingForEmail: WaitingForEmailScreen,
  },
  {
    initialRouteName: 'Loading',
  }
);
