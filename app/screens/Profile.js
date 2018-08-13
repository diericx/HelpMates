import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Button, View } from 'react-native';
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import EStyleSheet from 'react-native-extended-stylesheet';

import ChooseAvatar from '../components/ChooseAvatar';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50
  }
});

// Path within Database for metadata (also used for file Storage path)
const storagePath = 'uploads/avatars';
const databasePath = 'avatarsMeta';

// Component Enhancer that adds props.firebase and creates a listener for
// files them passes them into props.uploadedFiles
const enhance = compose(
  firebaseConnect([
    databasePath
  ]),
  connect( ({ firebase: { auth, profile }, firestore }) => ({
    avatars: firestore.data[databasePath],
    profile,
    auth,
  }))
)

class Profile extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
    firebase: PropTypes.object,
    avatars: PropTypes.object
  }

  constructor() {
    super();

    this.signOut = this.signOut.bind(this);
    this.onAvatarChosen = this.onAvatarChosen.bind(this);
  }

  signOut() {
    const { firebase } = this.context.store;
    firebase.auth().signOut();
  }

  async onAvatarChosen(image) {
    const { firebase, auth } = this.props

    // Get the image object
    const response = await fetch(image.uri);
    // Convert the image to a blob
    const blob = await response.blob();

    // Upload it to storage and get the download url. Update the user's profile
    //   with this download url.
    try {
      const opts = {
        name: auth.uid
      }
      let response = await firebase.uploadFile(storagePath, blob, databasePath, opts);
      let url = await response.uploadTaskSnapshot.ref.getDownloadURL();
      firebase.updateProfile({
        avatarUrl: url
      })
    } catch (e) {
      console.log("ERROR: ", e);
    }
    
  }

  render() {
    const { profile } = this.props;
    
    return (
      <View style={styles.container}>
        <ChooseAvatar 
          uri={profile.avatarUrl}
          onAvatarChosen={this.onAvatarChosen} 
        />

        <Button title={"Sign Out"} onPress={this.signOut}>
          Sign Out
        </Button>
      </View>
    );
  }
}

export default enhance(Profile);