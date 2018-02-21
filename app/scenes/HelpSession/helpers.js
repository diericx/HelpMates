import Meteor from 'react-native-meteor';

// Figure out which user's name to display for this session
export function GetOtherUsersNameForSession(session, currentUserId) {
  if (currentUserId === session.userId) {
    const user = Meteor.collection('users').findOne(session.tutorId);
    if (user) {
      return user.profile.name;
    }
  }
  const user = Meteor.collection('users').findOne(session.userId);
  if (user) {
    return user.profile.name;
  }
  return '';
}
