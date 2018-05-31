import React from "react";
import { View, Text, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

const styles = EStyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    height: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
  },
  iconStyle: {
    // marginHorizontal: 20,
  },
  iconContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  selectedIndicator: {
    width: 35,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#bcbcbc"
  }
});

let Icons = [
  "ios-book",
  "ios-people",
  "ios-chatbubbles"
]

export default function(currentIndex, total) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'white']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 60,
        }}
      />

      {Icons.map((icon, iconIndex) => {
        return (
          <View key={iconIndex} style={styles.icon}>
            <View style={styles.iconContainerStyle}>
              <Ionicons style={styles.iconStyle} name={Icons[iconIndex]} size={32} color="#bcbcbc" />
            </View>
            {iconIndex == currentIndex ? <View style={styles.selectedIndicator}/> : null}

          </View>
        )
      })}

    </View>
  )
}