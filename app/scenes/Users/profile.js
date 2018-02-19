import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicSource: null,
    };
  }
  onUploadProfilePicture() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          profilePicSource: source,
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Text> Profile Screen </Text>
        <Button onPress={this.onUploadProfilePicture.bind(this)} title="Upload Profile Picture" />
        <Image source={this.state.avatarSource} />
      </View>
    );
  }
}
