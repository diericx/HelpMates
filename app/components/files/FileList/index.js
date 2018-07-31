import { connect } from 'react-redux'

import FileList from "./FileList";

export default connect((state, props) => {
  let { parentId } = props;
  return {
    files: state.firestore.data[`files-${parentId}`],
  }
})(FileList)