import Meteor, { withTracker } from 'react-native-meteor';

import UniversityList from "./UniversityList";

export default withTracker(params => {
  const handle = Meteor.subscribe('universities.all');
 
  return {
    ready: handle.ready(),
    universities: Meteor.collection('universities').find(),
  };
})(UniversityList);