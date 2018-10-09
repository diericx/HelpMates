const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();

exports.sendGroupMessagePushNotification = functions.firestore
  .document('groups/{groupId}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    // Get data from the message that just got created
    const newMessage = snap.data();
    let messageAuthor = 'Anonymous';
    if (newMessage.user && newMessage.user.name) {
      messageAuthor = newMessage.user.name;
    }

    const groupId = context.params.groupId;
    // Get the group
    const groupSnapshot = await admin
      .firestore()
      .collection('groups')
      .doc(groupId)
      .get();
    const group = groupSnapshot.data();
    // Get the member ids
    const memberIds = Object.keys(group.members);
    // Convert each ID to a promise that's querying their profile
    const getMemberProfilesPromises = memberIds.map(userId => {
      return admin
        .firestore()
        .collection('users')
        .doc(userId)
        .get();
    });

    // Fetch the profiles
    const memberProfileSnapshots = await Promise.all(getMemberProfilesPromises);
    var messages = [];

    // Loop over all of the profiles and add notification messages to the messages
    //   batch array.
    for (let i = 0; i < memberProfileSnapshots.length; i++) {
      const profile = memberProfileSnapshots[i].data();
      const userId = memberIds[i];
      const { pushNotificationsToken } = profile;
      // Don't do anything if the user has no push notifications
      if (!pushNotificationsToken) {
        continue;
      }
      // Add a message to the batch
      messages.push({
        to: pushNotificationsToken,
        body: `${messageAuthor}: ${newMessage.text}`,
      });
    }

    // Send the EXPO push request
    return fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });
  });
