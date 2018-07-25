import { connect } from 'react-redux'

import UniversityList from "./UniversityList";

export default connect((state) => ({
  universities: state.firestore.ordered.universities
}))(UniversityList)