import { Notifications, Permissions } from 'expo';

/**
 * validates that the given arguments exist, if not prints given error message
 * @param {String} errorMessage - message to pring on validation error
 * @param  {...any} args - values to validate
 */
export function validate(errorMessage, ...args) {
  args.forEach((arg, index) => {
    if (!arg) {
      console.error(`ERROR: ${errorMessage}, index: ${index}`);
    }
  });
}

export async function CheckNotificationStatus(firebase, profile) {
  // If firebase profile already has the token, don't worry about all of this!
  if (profile.pushNotificationsToken) {
    return;
  }

  // Check for existing permissions
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = status;

  // If no existing permissions ask user
  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // If no permission, exit the function...
  if (finalStatus !== 'granted') {
    return;
  }

  // Get push notification token
  const token = await Notifications.getExpoPushTokenAsync();

  // Update the user's profile with the token
  firebase.updateProfile({
    pushNotificationsToken: token,
  });
}
