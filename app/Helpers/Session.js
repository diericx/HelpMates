import Meteor from 'react-native-meteor';

export function CalculateTimeAndCost(session, now) {
  const diff = now.getTime() - session.startedAt.getTime();
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  // make sure none can be negative... not sure why they can in the first place
  if (seconds < 0) {
    seconds = 0;
  }
  if (minutes < 0) {
    minutes = 0;
  }
  if (hours < 0) {
    hours = 0;
  }
  // correct the minutes and seconds
  minutes %= 60;
  seconds %= 60;
  // calculate cost
  const cost = ((hours + minutes / 60 + seconds / 3600) * session.cost).toFixed(2);

  return {
    seconds,
    minutes,
    hours,
    cost,
  };
}

export function IsCurrentUserTutor(session) {
  return session.tutorId === Meteor.userId();
}

export function IsCurrentUserStudent(session) {
  return session.studentId === Meteor.userId();
}
