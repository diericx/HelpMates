const firebase = require("firebase");
require("firebase/firestore");

import {
  FIRE_API_KEY, 
  FIRE_AUTH_DOMAIN, 
  FIRE_DATABASE_URL, 
  FIRE_STORAGE_BUCKET,
  FIRE_PROJECT_ID,
  FIRE_MESSAGING_SENDER_ID
} from 'react-native-dotenv'

const settings = {
  apiKey: FIRE_API_KEY,
  authDomain: FIRE_AUTH_DOMAIN,
  databaseURL: FIRE_DATABASE_URL,
  projectId: FIRE_PROJECT_ID,
  storageBucket: FIRE_STORAGE_BUCKET,
  messagingSenderId: FIRE_MESSAGING_SENDER_ID,
  
}
//Initializing firebase firestore
firebase.initializeApp(settings);

const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true
})

export function GetUniversities(callback) {
  firebase.firestore().collection('universities').get()
    .then(querySnapshot => {
      let universities = []

      querySnapshot.forEach(function(doc) {
        universities.push({
          id: doc.id,
          ...doc.data()
        });
      });

      callback(universities);

    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

export default firebase;

