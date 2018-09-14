import React from 'react';
import { View, Text, Dimensions, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 75,
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 15,
  },
});

export default function FileModalFooter(props) {
  const { onPress } = props;
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        {/* <Text style={styles.whiteText}>Tap and hold to save image</Text> */}
        <Icon type="entypo" name="dots-three-horizontal" size={35} color="white" />
      </View>
    </TouchableHighlight>
  );
}
