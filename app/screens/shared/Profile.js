import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import { firebaseConnect } from 'react-redux-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';
import { UpdateAvatar } from '../../lib/Firestore';

import ChooseAvatar from '../../components/shared/ChooseAvatar';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
});

@compose(
  firebaseConnect(),
  connect(({ firebase: { profile } }) => ({
    profile,
  }))
)
class Profile extends React.Component {
  constructor() {
    super();

    this.signOut = this.signOut.bind(this);
    this.onAvatarChosen = this.onAvatarChosen.bind(this);
  }

  async onAvatarChosen(image) {
    const { firebase } = this.props;
    await UpdateAvatar(image.uri, firebase);
  }

  signOut() {
    const { firebase, navigation } = this.props;

    firebase.logout();
    navigation.navigate('Loading');
  }

  render() {
    const {
      profile: { avatar },
    } = this.props;
    const { preview, uri } = avatar;

    return (
      <View style={styles.container}>
        <ChooseAvatar onComplete={this.onAvatarChosen} {...{ preview, uri }} />

        <Button title="Sign Out" onPress={this.signOut}>
          Sign Out
        </Button>
      </View>
    );
  }
}

export default Profile;
