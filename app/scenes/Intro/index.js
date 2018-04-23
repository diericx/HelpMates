import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo";
import AppIntroSlider from "react-native-app-intro-slider";

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});

const slides = [
  {
    key: "somethun",
    title: "Start making money!",
    text:
      "Go into your profile\n\nSet your availabilities and the classes you've taken.\n\n We'll take care of the rest.",
    icon: "ios-card",
    colors: ["#63E2FF", "#B066FE"]
  },
  {
    key: "somethun1",
    title: "Get help with you classes!",
    text: (
      <Text>
        <Text>
          Find someone who's already taken the courses you're in for help with
          specific projects or assignments {"\n\n"}
        </Text>
        <Text style={{ fontWeight: "bold" }}>OR {"\n\n"}</Text>
        <Text>Use the</Text>
        <Text style={{ fontWeight: "bold" }}> anonymous group chats </Text>
        <Text>to ask quick questions</Text>
      </Text>
    ),
    icon: "ios-school-outline",
    colors: ["#A3A1FF", "#3A3897"]
  },
  {
    key: "somethun2",
    title: "Go get a drink",
    text: "We make studying easier so you have more time to relax.",
    icon: "ios-beer-outline",
    colors: ["#29ABE2", "#4F00BC"]
  }
];

export default class App extends React.Component {
  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height
        }
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Ionicons
        style={{ backgroundColor: "transparent" }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        bottomButton
      />
    );
  }
}
