import React from 'react';
import { ImageManipulator } from 'expo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import { UpdateAvatar } from '../lib/F7';
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
    const { firebase } = this.props
    await UpdateAvatar(image.uri, firebase);
  }

  render() {
    const { profile: { avatar } } = this.props;
    const { preview, uri } = avatar;
    
    return (
      <View style={styles.container}>
        <ChooseAvatar 
          onComplete={this.onAvatarChosen}
          {...{preview, uri}} 
        />

        <Button title={"Sign Out"} onPress={this.signOut}>
          Sign Out
        </Button>
      </View>
    );
  }
}

export default enhance(Profile);