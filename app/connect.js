import Meteor from 'react-native-meteor';
import Expo from 'expo';

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost
    .split(':')
    .shift()
    .concat(':3000/websocket')
  : 'localhost:3000/websocket';

export default function () {
  console.log(api);
  const url = `ws://${api}`;
  Meteor.connect(url);
}
