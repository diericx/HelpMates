import Meteor from "react-native-meteor";

// Figure out which user's name to display for this session
export function GetOtherUsersNameForSession(session, currentUserId) {
  if (currentUserId === session.studentId) {
    const user = Meteor.collection("users").findOne(session.tutorId);
    if (user) {
      return user.profile.name;
    }
  }
  const user = Meteor.collection("users").findOne(session.studentId);
  if (user) {
    return user.profile.name;
  }
  return "";
}

export function GetOtherUsersIdForSession(session) {
  const currentUserId = Meteor.userId();
  if (currentUserId === session.studentId) {
    const user = Meteor.collection("users").findOne(session.tutorId);
    if (user) {
      return user._id;
    }
  }
  const user = Meteor.collection("users").findOne(session.studentId);
  if (user) {
    return user._id;
  }
  return null;
}

export function IsSessionActive(session) {
  return session.tutorAccepted;
}

export function HasCurrentUserEnded(session) {
  const userId = Meteor.userId();
  return (
    (userId == session.tutorId && session.tutorEnded) ||
    (userId == session.studentId && session.studentEnded)
  );
}
