import React from 'react';
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
});

export default class ChooseAvatar extends React.Component {
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
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <CachedAvatar
          size={300}
          rounded
          onPress={this._pickImage}
          preview={preview == null ? null : preview}
          {...{ uri }}
        />
      </View>
    );
  }
}
