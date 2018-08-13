import { connect } from 'react-redux'

import CourseList from "./CourseList";

export default connect((state) => ({
  courses: state.firestore.ordered.courses,
  auth: state.firebase.auth,
  profile: state.firebase.profile
}))(CourseList)