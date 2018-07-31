import React from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50
  }
});

class Profile extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    const { firebase } = this.context.store;
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title={"Sign Out"} onPress={this.signOut}>
          Sign Out
        </Button>
      </View>
    );
  }
}

export default Profile;