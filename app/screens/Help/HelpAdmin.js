import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import NavigationService from '../../config/navigationService';

const styles = EStyleSheet.create({});

export default class HelpAdmin extends React.Component {
  render() {
    return (
      <View>
        <Text>You are an admin</Text>
      </View>
    );
  }
}
