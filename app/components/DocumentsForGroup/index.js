import Meteor, { withTracker } from 'react-native-meteor';

import DocumentsForGroup from "./DocumentsForGroup";

export default withTracker(params => {
  const documents = Meteor.subscribe('documents.allForGroup', {groupId: params.groupId});
 
  return {
    ready: documents.ready(),
    documents: Meteor.collection('documents').find({groupId: params.groupId}),
  };
})(DocumentsForGroup);