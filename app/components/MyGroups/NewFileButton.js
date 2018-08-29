import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 75,
    backgroundColor: '$indigo',

    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
});

const NewFileButton = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
    <Icon name="add" size={30} color="white" />
  </TouchableOpacity>
);

export default NewFileButton;
