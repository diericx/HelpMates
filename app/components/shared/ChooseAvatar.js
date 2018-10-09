import React from 'react';
import PropTypes from 'prop-types';
import { ImagePicker, Permissions } from 'expo';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CachedAvatar from './CachedAvatar';

const styles = EStyleSheet.create({
  container: {
    marginBottom: 40,
  },
  cameraView: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  centerText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

/**
 * A component that will display a given avatar, but also give the user an option
 * to replace the avatar by tapping on it.
 */
class ChooseAvatar extends React.Component {
  state = {
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const camStatus = (await Permissions.askAsync(Permissions.CAMERA)).status;
    const rollStatus = (await Permissions.askAsync(Permissions.CAMERA_ROLL)).status;
    this.setState({ hasCameraPermission: camStatus === 'granted' && rollStatus === 'granted' });
  }

  keyExtractor = item => item.id;

  _pickImage = async () => {
    const { onComplete } = this.props;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.cancelled) {
      onComplete(result);
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    const { preview, uri } = this.props;

    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <Text style={styles.centerText}>
          Give HelpMates Camera access under {'\n'}
          Settings->Privacy->Camera {'\n'}
          Your profile picture is only shared when you aren't anonymous {'\n'}
        </Text>
      );
    }
    return (
      <View style={styles.container}>
        <CachedAvatar size={300} rounded onPress={this._pickImage} {...{ uri, preview }} />
      </View>
    );
  }
}

ChooseAvatar.propTypes = {
  uri: PropTypes.string,

  onComplete: PropTypes.func,
  preview: PropTypes.string,
};

ChooseAvatar.defaultProps = {
  uri: null,
  onComplete: null,
  preview: null,
};

export default ChooseAvatar;
