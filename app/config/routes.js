import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';

//
const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
        headerTitle: 'Home',
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

// Root navigator
export default StackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
  },
  {
    mode: 'modal',
    header: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
);
