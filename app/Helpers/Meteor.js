import Meteor from "react-native-meteor";

// METEOR - Send the message to the server
export function SendMessage(conversationId, message) {
  Meteor.call(
    "conversations.sendMessage",
    { conversationId, message },
    (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      }
    }
  );
}

export function GUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

/**
|--------------------------------------------------
| USER
|--------------------------------------------------
*/

// rate a specific user
export function RateUser(
  userId,
  targetUserId,
  courseId,
  sessionId,
  rating,
  message
) {
  Meteor.call(
    "ratings.rateUser",
    {
      userId,
      targetUserId,
      courseId,
      sessionId,
      rating,
      message
    },
    (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      } else {
        console.log("Accepted Session!");
      }
    }
  );
}

// get all tutors
export function getAllTutors() {
  Meteor.call("users.getAllTutors", {}, (err, res) => {
    // Do whatever you want with the response
    if (err) {
      console.log(err);
    } else {
      return res;
    }
  });
}

// set the current user's profile picture
export function SetProfilePic(url) {
  Meteor.call("user.setProfilePic", { url }, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
}

// set the current user's push notification token
export function SetPushNotificationToken(token) {
  let userId = Meteor.user()._id;
  Meteor.call(
    "user.setPushNotificationToken",
    { token, userId },
    (err, res) => {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    }
  );
}

// METOER - get users availabilities
export function ConvertAvailabilitiesToArray(availabilities) {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  availabilities_array = availabilities.map(availability =>
    availability.date.toString()
  );
  return ds.cloneWithRows(availabilities_array);
}

// METEOR - add availability to profile
export function AddAvailability(chosenDate) {
  Meteor.call(
    "users.addAvailability",
    { date: chosenDate, length: "60", repeats: true },
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

/**
|--------------------------------------------------
| SESSION
|--------------------------------------------------
*/

// Accept this session
export function AcceptSession(session) {
  const sessionId = session._id;
  Meteor.call("helpSessions.accept", { sessionId }, (err, res) => {
    // Do whatever you want with the response
    if (err) {
      console.log(err);
    } else {
      console.log("Accepted Session!");
    }
  });
}

// Deny this session
export function DenySession(session) {
  const sessionId = session._id;
  Meteor.call("helpSessions.deny", { sessionId }, (err, res) => {
    // Do whatever you want with the response
    if (err) {
      console.log(err);
    } else {
      console.log("Denied Session!");
    }
  });
}

// Start this session
export function StartSesson(session) {
  const sessionId = session._id;
  Meteor.call("helpSessions.start", { sessionId }, (err, res) => {
    // Do whatever you want with the response
    if (err) {
      console.log(err);
    } else {
      console.log("Started Session!");
    }
  });
}

// End this session
export function EndSession(session) {
  const sessionId = session._id;
  Meteor.call("helpSessions.end", { sessionId }, (err, res) => {
    // Do whatever you want with the response
    if (err) {
      console.log(err);
    } else {
      console.log("Ended Session!");
    }
  });
}

/**
|--------------------------------------------------
| COURSES
|--------------------------------------------------
*/

export function AddCompletedCourse(courseId) {
  Meteor.call(
    "users.addCompletedCourse",
    { courseId, rate: 15 },
    (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      }
    }
  );
}
