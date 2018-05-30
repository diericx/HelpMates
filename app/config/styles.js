import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Build global stylesheet variables
EStyleSheet.build({
  $screenWidth: Dimensions.get("window").width,
  // Main theme colors
  $bgColor: "white",
  $lightblue: "#18dcff",

  $black: "black",
  $offBlack: "rgb(60, 60, 60)",
  $lightgray: "#F3F3F3",
  $gray: "#888E92",
  $darkgray: "#3a3a3a",
  $purple: "#cd84f1",
  $offWhite: "rgb(252, 252, 252)",
  $offWhiteDown: "rgb(247, 247, 247)",
  $lightblueTrans: "rgba(24, 220, 255, 0.1)",
  $lightblueDown: "#76f2e7",
  $green: "#3ae374",
  $greenTrans: "#3ae37470",
  $red: "#ff4d4d",
  $lightred: "#ff4d4d22",
  $orange: "#ffb349",
  $turquoise: "#67e6dc"
});