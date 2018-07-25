import Meteor, { withTracker } from 'react-native-meteor';

import Document from "./Document";

export default Document;
// export default withTracker(params => {
//   const document = Meteor.subscribe('documents.find', {_id: params.id});
 
//   return {
//     ready: document.ready(),
//     document: Meteor.collection('documents').findOne({_id: params.id}),
//   };
// })(Document);