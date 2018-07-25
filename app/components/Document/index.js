import { connect } from 'react-redux'

import Document from "./Document";

export default connect((state) => ({
  entries: state.firestore.data.entries,
}))(Document)