import { connect } from 'react-redux'

import FileList from "./FileList";

export default connect((state, props) => {
  let { groupId } = props;
  return {
    files: state.firestore.data.files,
  }
})(FileList)