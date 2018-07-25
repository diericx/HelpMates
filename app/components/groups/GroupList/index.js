import { connect } from 'react-redux'

import GroupList from "./GroupList";

export default connect((state) => {
  console.log("STATE: ", state.firestore.data)
  return {
    courses: state.firestore.courses,
    groups: state.firestore.ordered.groups,
    auth: state.firebase.auth,
  }
})(GroupList)