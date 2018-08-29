import { ImageManipulator } from 'expo';

const AVATARS_STORAGE_PATH = 'uploads/avatars';
const AVATARS_META_DATABASE_PATH = 'avatarsMeta';

// Uploads an image to Firebase Storage and then updates the user's profile with the new image
//   as their avatar.
export async function UpdateAvatar(imageUri, firebase) {
  const fileName = firebase.auth().currentUser.uid;

  // Create the preview and get the uri for that
  let compressOptions = [{resize: {width: 50, height: 50}}];
  let preview = await ImageManipulator.manipulate(imageUri, compressOptions, {base64: true, format: 'jpeg', compress: 0.2})
  // Get the image object
  const response = await fetch(imageUri);

  // Convert the image to a blob
  const blob = await response.blob();

  console.log("Got image: ", imageUri);
  console.log("Uploading file...");

  // Upload it to storage and get the download url. Update the user's profile
  //   with this download url.
  try {
    const opts = {
      name: fileName
    }
    let response = await firebase.uploadFile(AVATARS_STORAGE_PATH, blob, AVATARS_META_DATABASE_PATH, opts);
    let uri = await response.uploadTaskSnapshot.ref.getDownloadURL();
    console.log("Updating profile...");
    firebase.updateProfile({
      avatar: {
        uri,
        preview: `data:image/jpeg;base64,${preview.base64}`
      }
    })
  } catch (e) {
    console.log("ERROR: ", e);
  }
  
}