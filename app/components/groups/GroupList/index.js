import Meteor, { withTracker } from 'react-native-meteor';

import GroupList from "./GroupList";

export default withTracker(params => {
  const groupsHandle = Meteor.subscribe(params.subscribe || 'groups.all', params.findOptions || {courseId: params.courseId});
  const courseHandle = Meteor.subscribe('courses.find', {courseId: params.courseId});
 
  return {
    ready: groupsHandle.ready() && courseHandle.ready(),
    groups: Meteor.collection('groups').find(params.findOptions || {courseId: params.courseId}),
  };
})(GroupList);