import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

import MyGroupsList from "./MyGroupsList";

export default withTracker(params => {
  const handle = Meteor.subscribe('groups');
 
  return {
    ready: handle.ready(),
    groups: Meteor.collection('conversations').find({
      isGroup: true,
      members: {
        $in: [Meteor.userId()]
      }
    })
  };
})(MyGroupsList);