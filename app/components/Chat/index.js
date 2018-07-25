import { connect } from 'react-redux'

import Chat from "./Chat";

export default connect((state, props) => {
  let { groupId } = props;
  return {
    group: state.firestore.data.groups[groupId],
    messages: state.firestore.data.messages,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
})(Chat)