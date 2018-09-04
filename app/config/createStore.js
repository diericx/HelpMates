import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

import { createStore, combineReducers, compose } from 'redux';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { reactReduxFirebase, firebaseReducer, firebaseConnect } from 'react-redux-firebase';
import firebase from 'firebase/app';

import {
  FIRE_API_KEY,
  FIRE_AUTH_DOMAIN,
  FIRE_DATABASE_URL,
  FIRE_STORAGE_BUCKET,
  FIRE_PROJECT_ID,
  FIRE_MESSAGING_SENDER_ID,
} from 'react-native-dotenv';

const firebaseConfig = {
  apiKey: FIRE_API_KEY,
  authDomain: FIRE_AUTH_DOMAIN,
  databaseURL: FIRE_DATABASE_URL,
  projectId: FIRE_PROJECT_ID,
  storageBucket: FIRE_STORAGE_BUCKET,
  messagingSenderId: FIRE_MESSAGING_SENDER_ID,
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  useFirestoreForStorageMeta: true,
  fileMetadataFactory: uploadRes => {
    // upload response from Firebase's storage upload
    const {
      metadata: { name, fullPath },
    } = uploadRes;
    // default factory includes name, fullPath, downloadURL
    return {
      name,
      fullPath,
    };
  },
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore().settings({ timestampsInSnapshots: true });
// Initialize storage
firebase.storage();

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // firebase instance as first argument
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

// Create store with reducers and initial state
const initialState = {};

// Export the store object that is generated
export default (store = createStoreWithFirebase(rootReducer, initialState));
