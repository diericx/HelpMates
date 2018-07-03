import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

import Chat from "./Chat";

export default withTracker(params => {
  const handle = Meteor.subscribe('messages', {receiverId: params.id});
 
  return {
    ready: handle.ready(),
    messages: Meteor.collection('messages').find({
      receiverId: params.id
    })
    // conversation: Meteor.collection('conversations').findOne({
    //   _id: params.id
    // })
  };
})(Chat);