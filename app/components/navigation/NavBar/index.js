import React from "react";
import { View, Text, StatusBar } from 'react-native';
import { Avatar } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient, Constants, BlurView } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

import FadingTransitionView from "../../FadingTransitionView";

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    paddingHorizontal: 10,
    paddingBottom: 7,
    alignItems: "center",
  },
  absoluteNavBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  defaultBackground: {
    backgroundColor: "$lightblue",
    zIndex: 0,
  },
  statusBar: {
    backgroundColor: "transparent",
    height: Constants.statusBarHeight,
  },

});

export default function(props) {
  return (
    <View style={[props.absolute ? styles.absoluteNavBar : null ]}>

      {!props.placeholder ?
        <FadingTransitionView index={props.index} xOffset={props.xOffset} style={[styles.absoluteNavBar, props.backgroundColor || styles.defaultBackground]} />
      : null }

      <View style={styles.statusBar} />

      <View style={[
        styles.container, 
        props.style, 
        props.defaultBackground ? styles.defaultBackground : null 
      ]}>
        {props.placeholder ? <View style={{width: 40, height: 40}} /> : 
        <Avatar
          size={40}
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={styles.avatar}
        />}

        

        {!props.placeholder ?
          <FadingTransitionView index={props.index} xOffset={props.xOffset}>
            {props.children}
            
          </FadingTransitionView>
        : <View>{props.children}</View> }
          
      </View>

      
      
    </View>
  )
}