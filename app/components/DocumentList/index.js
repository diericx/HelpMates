import { connect } from 'react-redux'

import DocumentList from "./DocumentList";

export default connect((state, props) => {
  let { groupId } = props;
  return {
    documents: state.firestore.data.documents,
  }
})(DocumentList)