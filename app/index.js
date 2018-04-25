import React from "react";
import { Dimensions, AsyncStorage, View, StatusBar } from "react-native";
import Meteor, { createContainer } from "react-native-meteor";
import EStyleSheet from "react-native-extended-stylesheet";
import Font from "expo";
import { Permissions, Notifications } from "expo";

import Intro from "./scenes/Intro/index";
import connect from "./connect";

import { MainNavigation, AuthNavigation } from "./config/routes";
import {
  SetPushNotificationToken,
  GetSessionNotificationCount
} from "./Helpers/Meteor";

// Build global stylesheet variables
EStyleSheet.build({
  $screenWidth: Dimensions.get("window").width,
  $bgColor: "white",
  $black: "black",
  $offBlack: "rgb(60, 60, 60)",
  $lightgray: "#F3F3F3",
  $gray: "#888E92",
  $darkgray: "#3a3a3a",
  $purple: "#cd84f1",
  $offWhite: "rgb(252, 252, 252)",
  $offWhiteDown: "rgb(247, 247, 247)",
  $lightBlue: "#18dcff",
  $lightBlueDown: "#76f2e7",
  $green: "#3ae374",
  $greenTrans: "#3ae37470",
  $red: "#ff4d4d",
  $orange: "#ffb349"
});

const styles = EStyleSheet.create({
  container: {
    flex: 1
  }
});

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return SetPushNotificationToken(token);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false };
    const hasSeenIntro = this.getHasSeenIntro();

    // bind
    this.setHasSeenIntro = this.setHasSeenIntro.bind(this);
  }

  async componentWillMount() {
    // Import Assets
    await Expo.Font.loadAsync({
      Milkshake: require("../assets/fonts/Milkshake.ttf"),
      OpenSansLight: require("../assets/fonts/OpenSansLight.ttf"),
      OpenSansBold: require("../assets/fonts/OpenSansBold.ttf"),
      OpenSans: require("../assets/fonts/OpenSansRegular.ttf")
    });

    connect();

    try {
      const value = await AsyncStorage.getItem("@MySuperStore:anonymousKey");
      if (value !== null) {
        // We have data!!
        console.log("Found anonymous key: ", value);
      } else {
        try {
          await AsyncStorage.setItem(
            "@MySuperStore:anonymousKey",
            this.generateAnonymousKey()
          );
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }

    this.setState({ isReady: true });
  }

  async getHasSeenIntro() {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:hasSeenIntro");
      if (value == null) {
        value = false;
      } else {
        value = true;
      }
      this.setState({
        hasSeenIntro: value
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  async setHasSeenIntro(value) {
    try {
      await AsyncStorage.setItem("@MySuperStore:hasSeenIntro", value);
      this.setState({
        hasSeenIntro: value
      });
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  generateAnonymousKey() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  render() {
    const { user, loggingIn, sessionsWithNotifications } = this.props;
    const { hasSeenIntro } = this.state;

    console.log("HAS SEEN INTRO: ", hasSeenIntro);

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    } else if (user == null) {
      return (
        <AuthNavigation
          user={user}
          loggingIn={loggingIn}
          onNavigationStateChange={null}
        />
      );
    }
    if (!loggingIn && user) {
      // Register this device for push notifications
      registerForPushNotificationsAsync();
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {/* {hasSeenIntro ? (
            <MainNavigation onNavigationStateChange={null} />
          ) : (
            <Intro onCompleteIntro={() => this.setHasSeenIntro(true)} />
          )} */}
          <MainNavigation
            onNavigationStateChange={null}
            screenProps={{
              notifications: {
                Sessions: GetSessionNotificationCount(sessionsWithNotifications)
              }
            }}
          />
        </View>
      );
      // return <MainNavigation onNavigationStateChange={null} />;
    }
  }
}

export default createContainer(params => {
  // Global Subscribes
  Meteor.subscribe("courses");
  Meteor.subscribe("mySessions");
  // Get notifications for this user
  // Meteor.subscribe("helpSessions.withNotifications");
  const notificationLocation = `notifications.${Meteor.userId()}`;

  return {
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
    sessionsWithNotifications: Meteor.collection("helpSessions").find({
      [notificationLocation]: { $ne: 0 }
    })
  };
}, App);
