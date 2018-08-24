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

@firebaseConnect()
@connect( ({ firebase: { profile } }) => ({
  profile,
}))
class Profile extends React.Component {
  constructor() {
    super();

    this.signOut = this.signOut.bind(this);
    this.onAvatarChosen = this.onAvatarChosen.bind(this);
  }

  signOut() {
    const { firebase } = this.props;

    firebase.logout();
    this.props.navigation.navigate('Loading');
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

export default Profile;