import Meteor from "react-native-meteor";
import Expo from "expo";

export default function() {
  // const url = "ws://10.7.107.240:3000/websocket";
  const url = "https://helpmates.appdojo.com/websocket";
  Meteor.connect(url);
}
