import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
    width: '100%',
    paddingHorizontal: 40,
    justifyContent: 'flex-end',
  },
  whiteText: {
    color: 'white',
  },
});

export default function FileModalFooter(props) {
  const { onPress } = props;
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <Icon type="entypo" name="dots-three-horizontal" size={35} color="white" />
      </View>
    </TouchableHighlight>
  );
}
