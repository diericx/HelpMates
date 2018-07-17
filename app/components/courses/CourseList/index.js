import Meteor, { withTracker } from 'react-native-meteor';

import CourseList from "./CourseList";

export default withTracker(params => {
  const handle = Meteor.subscribe(params.subscribe || 'courses.all', {universityId: params.universityId});
  return {
    ready: handle.ready(),
    courses: Meteor.collection('courses').find({universityId: params.universityId, ...params.findOptions}),
  };
})(CourseList);