import { connect } from 'react-redux'

import Chat from "./Chat";

export default connect((state, props) => {
  let { groupId } = props;
  // console.log(state.firestore)
  // console.log(props);
  return {
    group: state.firestore.data.groups[groupId],
    messages: state.firestore.data.messages,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
})(Chat)