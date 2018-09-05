import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    marginLeft: -4,
  },
  bottom: {
    flexDirection: 'row',
  },
  countText: {
    paddingTop: 1,
  },

  gray: {
    color: 'gray',
  },
});

/**
 * Displayes a subtitle and then a user count with an icon next to it if the
 * userCount prop is provided.
 */
const ListViewSubtitle = ({ subtitle, userCount }) => (
  <View style={styles.container}>
    {subtitle != null && subtitle != '' ? (
      <View style={styles.top}>
        <Text style={styles.gray}> {subtitle} </Text>
      </View>
    ) : null}

    {userCount != null ? (
      <View style={styles.bottom}>
        <Icon name="person" size={18} iconStyle={styles.gray} />
        <Text style={[styles.countText, styles.gray]}> {userCount} </Text>
      </View>
    ) : null}
  </View>
);

export default ListViewSubtitle;
