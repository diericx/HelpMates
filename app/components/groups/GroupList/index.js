import Meteor, { withTracker } from 'react-native-meteor';

import GroupList from "./GroupList";

export default withTracker(params => {
  const handle = Meteor.subscribe(params.subscribe || 'groups.all', params.findOptions || {courseId: params.courseId});
 
  return {
    ready: handle.ready(),
    groups: Meteor.collection('groups').find(params.findOptions || {courseId: params.courseId}),
  };
})(GroupList);