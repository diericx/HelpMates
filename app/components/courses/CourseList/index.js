import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

import CourseList from "./CourseList";

export default withTracker(params => {
  const handle = Meteor.subscribe('courses');
 
  return {
    coursesReady: handle.ready(),
    courses: Meteor.collection('courses').find(),
  };
})(CourseList);