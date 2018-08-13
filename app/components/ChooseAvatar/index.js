import React from 'react';
import PropTypes from 'prop-types'
import { ImagePicker, Permissions } from 'expo';

import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from "react-native-elements";

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
      quality: 0.5
    });

    if (!result.cancelled) {
      this.props.onAvatarChosen(result)
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    const { uri } = this.props

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Avatar
            size={200}
            rounded
            source={uri ? {uri, cache: 'force-cache'} : null}
            icon={{name: 'face', size: 200}}
            containerStyle={styles.avatarContainer}
            onPress={this._pickImage}
            activeOpacity={0.7}
          />
        </View>
      );
    }
  }
}
