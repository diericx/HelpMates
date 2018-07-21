import { connect } from 'react-redux'

import CourseList from "./CourseList";

export default connect((state) => ({
  courses: state.firestore.ordered.courses
}))(CourseList)