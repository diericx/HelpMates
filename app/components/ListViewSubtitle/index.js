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
    flexDirection: 'row'
  },
  countText: {
    paddingTop: 1
  },

  gray: {
    color: 'gray'
  }
});

const ListViewSubtitle = (props) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.top}>
        <Text style={styles.gray}> {props.subtitle} </Text>
      </View>

      <View style={styles.bottom}>
        <Icon name='person' size={18} iconStyle={styles.gray} />
        <Text style={[styles.countText, styles.gray]}> {props.userCount} </Text>
      </View>
      
    </View>
  );
};

export default ListViewSubtitle;