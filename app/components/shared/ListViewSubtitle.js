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

const ListViewSubtitle = props => {
  const { subtitle, userCount } = props;

  return (
    <View style={styles.container}>
      {subtitle != null && subtitle != '' ? (
        <View style={styles.top}>
          <Text style={styles.gray}> {subtitle} </Text>
        </View>
      ) : null}

      <View style={styles.bottom}>
        <Icon name="person" size={18} iconStyle={styles.gray} />
        <Text style={[styles.countText, styles.gray]}> {userCount} </Text>
      </View>
    </View>
  );
};

export default ListViewSubtitle;
