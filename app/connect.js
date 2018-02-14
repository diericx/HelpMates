import Meteor from 'react-native-meteor';

export default function () {
  const url = 'ws://10.7.1.103:3000/websocket';
  Meteor.connect(url);
}
