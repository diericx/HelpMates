import { withFirestore } from 'react-redux-firebase';

import { ImageManipulator } from 'expo';
import { validate } from './Utils';

const AVATARS_STORAGE_PATH = 'uploads/avatars';
const AVATARS_META_DATABASE_PATH = 'avatarsMeta';

const IMAGES_STORAGE_PATH = 'uploads/images';
const IMAGES_META_DATABASE_PATH = 'imagesMeta';

// Uploads an image to Firebase Storage and then updates the user's profile with the new image
//   as their avatar.
export async function UpdateAvatar(imageUri, firebase) {
  validate('Firebase.UpdateAvatar missing parameter/s', imageUri, firebase);
  const fileName = firebase.auth().currentUser.uid;

  // Create the preview and get the uri for that
  const compressOptions = [{ resize: { width: 50, height: 50 } }];
  const preview = await ImageManipulator.manipulate(imageUri, compressOptions, {
    base64: true,
    format: 'jpeg',
    compress: 0.2,
  });
  // Get the image object
  const response = await fetch(imageUri);

  // Convert the image to a blob
  const blob = await response.blob();

  console.log('Got image: ', imageUri);
  console.log('Uploading file...');

  // Upload it to storage and get the download url. Update the user's profile
  //   with this download url.
  try {
    const opts = {
      name: fileName,
    };
    const response = await firebase.uploadFile(
      AVATARS_STORAGE_PATH,
      blob,
      AVATARS_META_DATABASE_PATH,
      opts
    );
    const uri = await response.uploadTaskSnapshot.ref.getDownloadURL();
    console.log('Updating profile...');
    firebase.updateProfile({
      avatar: {
        uri,
        preview: `data:image/jpeg;base64,${preview.base64}`,
      },
    });
  } catch (e) {
    console.log('ERROR: ', e);
  }
}

/**
|--------------------------------------------------
| COURSES
|--------------------------------------------------
*/
export const JoinCourse = (firestore, auth, courseId) => {
  validate(
    'Firestore.JoinCourse(): Missing param or param is undefined',
    firestore,
    auth,
    courseId
  );

  const ref = firestore.collection('courses').doc(courseId);
  ref.set(
    {
      members: {
        [auth.uid]: true,
      },
    },
    { merge: true }
  );
};

/**
|--------------------------------------------------
| GROUPS
|--------------------------------------------------
*/

/**
 * Attempt to add the current user to a specific group
 * @param {string} groupId - ID of the group that you wish to join
 */
export const JoinGroup = (firestore, auth, groupId) => {
  validate('Firestore.JoinGroup(): Missing param or param is undefined', firestore, auth, groupId);

  firestore.update(
    {
      collection: 'groups',
      doc: groupId,
    },
    {
      [`members.${auth.uid}`]: true,
    }
  );
};

/**
 * Attempt to remove the current user from a specific group
 * @param {string} groupId - ID of the group that you wish to leave
 */
export const LeaveGroup = (firestore, auth, groupId) => {
  validate('Firestore.LeaveGroup(): Missing param or param is undefined', firestore, auth, groupId);

  firestore.update(
    {
      collection: 'groups',
      doc: groupId,
    },
    {
      [`members.${auth.uid}`]: firestore.FieldValue.delete(),
    }
  );
};

/**
|--------------------------------------------------
| DOCUMENTS
|--------------------------------------------------
*/

export const UpdateDocument = (firestore, profile, fileId, delta) => {
  validate(
    'Firestore.UpdateDocument(): Missing param or param is undefined',
    firestore,
    profile,
    fileId,
    delta
  );

  firestore.update(
    {
      collection: 'files',
      doc: fileId,
    },
    {
      ...delta,
      updatedBy: profile.name,
    }
  );
};

/**
|--------------------------------------------------
| FILES
|--------------------------------------------------
*/

/**
 * Creates a new file given a title and a type. This is a fairly generic function.
 * If the type is 'image' it will attempt to get an image from the user's
 *  library and use that as the file.
 * @param {string} parentId - the id of this file's parent
 * @param {string} title - name of the file
 * @param {string} type - type of the file
 * @param {object} otherData - other data that should go into the file
 */
export const NewFile = (firestore, profile, parentId, title, type, otherData) => {
  validate(
    'Firestore.NewFile(): Missing param or param is undefined',
    firestore,
    profile,
    parentId,
    title,
    type
  );

  firestore.add('files', {
    title,
    type,
    parentId,
    ...otherData,
    createdBy: profile.name,
    updatedBy: profile.name,
  });
};

/**
 * Uploads a file to firebase storage
 * @param {string} imageUri - Local URI to the image we want to upload
 * @param {object} firebase - firebase obj
 */
export async function UploadImage(name, imageUri, firebase) {
  validate('Firebase.UploadImage(): missing parameter', imageUri, firebase);

  // Create the preview and get the uri for that
  const compressOptions = [{ resize: { width: 50, height: 50 } }];
  const preview = await ImageManipulator.manipulate(imageUri, compressOptions, {
    base64: true,
    format: 'jpeg',
    compress: 0.2,
  });
  // Get the image object
  const response = await fetch(imageUri);

  // Convert the image to a blob
  const blob = await response.blob();

  console.log('Firebase.UploadImage(): Got image: ', imageUri);
  console.log('Firebase.UploadImage(): Uploading file...');

  // Upload it to storage and get the download url. Update the user's profile
  //   with this download url.
  try {
    const opts = {
      name,
    };
    const response = await firebase.uploadFile(
      IMAGES_STORAGE_PATH,
      blob,
      IMAGES_META_DATABASE_PATH,
      opts
    );
    const uri = await response.uploadTaskSnapshot.ref.getDownloadURL();
    return { uri, preview: `data:image/jpeg;base64,${preview.base64}` };
  } catch (e) {
    console.log('ERROR: ', e);
  }
}
