import Meteor, { withTracker } from 'react-native-meteor';

import Search from "./Search";

export default withTracker(params => {
  const handle = Meteor.subscribe('groups');
 
  return {
    groupsReady: handle.ready(),
    groups: Meteor.collection('conversations').find({
      isGroup: true,
      members: {
        $nin: [Meteor.userId()]
      }
    }),
    myGroups: Meteor.collection('conversations').find({
      isGroup: true,
      members: {
        $in: [Meteor.userId()]
      }
    })
  };
})(Search);