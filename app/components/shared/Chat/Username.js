import React from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  username: {
    color: 'gray',
  },
});

export default function Username(props) {
  const {
    currentMessage: { user },
    renderUsername,
    usernameStyle,
    usernameProps,
  } = props;

  const username = user.name;
  if (username) {
    // If a custom render method has been passed, use that
    if (renderUsername) {
      return renderUsername(...usernameProps);
    }
    return <Text style={[styles.username, usernameStyle]}>{username}</Text>;
  }
  return null;
}
