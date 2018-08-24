import React from 'react';
import { ImagePicker, Permissions } from 'expo';

import { View, Text } from 'react-native';
import CachedAvatar from "../CachedAvatar";

import styles from './styles';

export default class ChooseAvatar extends React.Component {
  state = {
    hasCameraPermission: null
  }

  async componentWillMount() {
    const cam_status = (await Permissions.askAsync(Permissions.CAMERA)).status;
    const roll_status = (await Permissions.askAsync(Permissions.CAMERA_ROLL)).status;
    this.setState({ hasCameraPermission: cam_status === 'granted' && roll_status === 'granted' });
  }

  keyExtractor = (item, index) => item.id

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.cancelled) {
      this.props.onComplete(result)
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    const { preview, uri } = this.props

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <CachedAvatar
            size={300}
            rounded
            onPress={this._pickImage}
            preview={preview == null ? null : {uri: preview}}
            {...{uri}}
          />
        </View>
      );
    }
  }
}
