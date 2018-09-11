import React from 'react';
import { View, Text, Image } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { Icon, Avatar } from 'react-native-elements';

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
import MyGroupsScreen from '../screens/MyGroups/MyGroups';
import GroupChatScreen from '../screens/MyGroups/GroupChat';
import GroupFilesScreen from '../screens/MyGroups/GroupFiles';
import FileScreen from '../screens/MyGroups/File';

// Help screen collection
import HelpUserScreen from '../screens/Help/User/HelpUser';
import FeedbackChatsAdmin from '../screens/Help/Admin/FeedbackChatsAdmin';
import ReportsAdmin from '../screens/Help/Admin/ReportsAdmin';
import AdminOrUser from '../screens/Help/AdminOrUser';
import FeedbackChatScreen from '../screens/Help/FeedbackChat';

// Shared
import ProfileScreen from '../screens/shared/Profile';
import NavBarAvatar from '../components/shared/NavBarAvater';

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
      headerRight: <NavBarAvatar />,
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
    MyGroups: {
      screen: MyGroupsScreen,
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
      headerRight: <NavBarAvatar />,
    }),
  }
);

export const HelpUserStack = createStackNavigator(
  {
    Help: {
      screen: HelpUserScreen,
      navigationOptions: {
        title: 'Help & Feedback',
      },
    },
    FeedbackChat: {
      screen: FeedbackChatScreen,
      navigationOptions: {
        title: 'Feedback',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        height: 70,
        borderBottomWidth: 0,
      },
      headerRight: <NavBarAvatar />,
    },
  }
);

const HelpAdminMaterialNav = createMaterialTopTabNavigator(
  {
    FeedbackChats: {
      screen: FeedbackChatsAdmin,
      navigationOptions: {
        title: 'Feedback Chats',
      },
    },
    Reports: {
      screen: ReportsAdmin,
      navigationOptions: {
        title: 'Reports',
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

export const HelpAdminStack = createStackNavigator(
  {
    HelpAdmin: {
      screen: HelpAdminMaterialNav,
      navigationOptions: {
        title: 'Admin',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        height: 70,
        borderBottomWidth: 0,
      },
    },
  }
);

export const HelpSwitchNav = createSwitchNavigator({
  AdminOrUser,
  HelpUser: {
    screen: HelpUserStack,
    navigationOptions: {
      title: 'Help & Feedback',
    },
  },
  HelpAdmin: {
    screen: HelpAdminStack,
    navigationOptions: {
      title: 'Admin',
    },
  },
});

export const TabNavigation = createBottomTabNavigator(
  {
    Explore: ExploreStack,
    MyGroups: MyGroupsStack,
    Help: HelpSwitchNav,
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
