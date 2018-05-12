import React from "react";
import { View, TextInput, Button } from "react-native";
import Meteor from "react-native-meteor";
import { Avatar } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import styles from "./styles";

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this._pickImage = this._pickImage.bind(this);
  }

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.props.onChoosePhoto(result.uri);
    }
  };

  render() {
    let { profilePicURI } = this.props;
    return (
      <View style={styles.container}>
        {profilePicURI == null || profilePicURI == "" ? (
          <Avatar
            size={this.props.size || "xlarge"}
            rounded
            // overlayContainerStyle={styles.overlayContainer}
            icon={{ name: "person" }}
            activeOpacity={1}
          />
        ) : (
          <Avatar
            size={this.props.size || "xlarge"}
            rounded
            source={{ uri: profilePicURI }}
            activeOpacity={1}
          />
        )}

        <Button
          onPress={this._pickImage}
          color={this.props.buttonColor || "white"}
          title={this.props.buttonText || "Tap to Choose Profile Picture"}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
