import React from "react";
import { View, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    paddingHorizontal: 10,
    paddingBottom: 7,
    zIndex: 99,
    alignItems: "center"
  },
  absoluteNavBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  defaultBackground: {
    backgroundColor: "$lightblue"
  },
});

export default function(props) {
  return (
    <View style={[
      styles.container, 
      props.style, 
      props.absolute ? styles.absoluteNavBar : null, 
      props.defaultBackground ? styles.defaultBackground : null 
    ]}>
      <Avatar
        size={40}
        rounded
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        containerStyle={styles.avatar}
      />
      {props.children}
    </View>
  )
}