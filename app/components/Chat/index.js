import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

import Chat from "./Chat";

export default withTracker(params => {
  const handle = Meteor.subscribe('group', {_id: params.groupId});
 
  return {
    ready: handle.ready(),
    messages: Meteor.collection('groups').findOne({
      _id: params.groupId
    }).messages
  };
})(Chat);