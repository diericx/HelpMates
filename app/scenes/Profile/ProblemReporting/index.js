import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chat: {
    flex: 1,
  },
  sessionDataContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sessionData: {},
  sessionDataText: {
    color: 'gray',
    paddingVertical: 5,
  },
  centerText: {
    textAlign: 'center',
  },
});

export default class Index extends React.Component {
  static navigationOptions = {
    title: 'FAQ',
    headerBackTitle: 'Back',
    headerStyle: {
      backgroundColor: '#cd84f1',
    },

    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'Milkshake',
    },
  };

  render() {
    return (
      <View>
        <Text>Problem Reporting Testing</Text>
      </View>
    )
  };
};