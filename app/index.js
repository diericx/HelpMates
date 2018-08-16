import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { reactReduxFirebase, firebaseReducer, firebaseConnect } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


import { AuthStack, RootStack } from './config/routes';
import Loading from "./components/Loading"
import settings from './config/settings';
import styles from './config/styles';

import {
  FIRE_API_KEY, 
  FIRE_AUTH_DOMAIN, 
  FIRE_DATABASE_URL, 
  FIRE_STORAGE_BUCKET,
  FIRE_PROJECT_ID,
  FIRE_MESSAGING_SENDER_ID
} from 'react-native-dotenv';


const firebaseConfig = {
  apiKey: FIRE_API_KEY,
  authDomain: FIRE_AUTH_DOMAIN,
  databaseURL: FIRE_DATABASE_URL,
  projectId: FIRE_PROJECT_ID,
  storageBucket: FIRE_STORAGE_BUCKET,
  messagingSenderId: FIRE_MESSAGING_SENDER_ID,
}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  useFirestoreForStorageMeta: true,
  fileMetadataFactory: (uploadRes) => {
    // upload response from Firebase's storage upload
    const { metadata: { name, fullPath } } = uploadRes
    // default factory includes name, fullPath, downloadURL
    return {
      name,
      fullPath,
    }
  }
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
// Initialize Cloud Firestore through Firebase
firebase.firestore().settings({timestampsInSnapshots: true});
// Initialize storage
firebase.storage()

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // firebase instance as first argument
  reactReduxFirebase(firebase, rrfConfig),
)(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

class HelpMates extends React.Component {
  // Initially set loading to true until we get info from firebase
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  // Subscribe to auth events on mount
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  // End the subscription when the component unmounts
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { loading, user } = this.state;
    console.log("USER PROFILE: ", firebase.profile);
    if (loading) {
      return <Loading size="large"/>;
    } else if (user !== null) {
      return (
        <Provider store={store}>
          <RootStack />
        </Provider>
      )
    }
    return (
      <Provider store={store}>
        <AuthStack />
      </Provider>
    );
  }
}

export default HelpMates;