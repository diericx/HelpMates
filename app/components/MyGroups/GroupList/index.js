import { connect } from 'react-redux'

import GroupList from "./GroupList";

export default connect((state) => {
  return {
    courses: state.firestore.courses,
    groups: state.firestore.ordered.groups,
    auth: state.firebase.auth,
  }
})(GroupList)