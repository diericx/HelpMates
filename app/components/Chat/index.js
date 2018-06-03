import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

import Chat from "./Chat";

export default withTracker(params => {
  const handle = Meteor.subscribe('groups');
 
  return {
    ready: handle.ready(),
    conversation: Meteor.collection('conversations').findOne({
      _id: params.id
    })
  };
})(Chat);