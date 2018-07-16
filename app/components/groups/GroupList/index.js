import Meteor, { withTracker } from 'react-native-meteor';

import GroupList from "./GroupList";

export default withTracker(params => {
  const handle = Meteor.subscribe('groups.all', {courseId: params.courseId});
 
  return {
    ready: handle.ready(),
    groups: Meteor.collection('groups').find({courseId: params.courseId}),
  };
})(GroupList);