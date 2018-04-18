import React from "react";
import { View, TextInput, Button } from "react-native";
import Meteor from "react-native-meteor";
import { Avatar } from "react-native-elements";
import { ImagePicker } from "expo";
import styles from "./styles";

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this._pickImage = this._pickImage.bind(this);
  }

  _pickImage = async () => {
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
          <Avatar xlarge rounded icon={{ name: "person" }} activeOpacity={1} />
        ) : (
          <Avatar
            xlarge
            rounded
            source={{ uri: profilePicURI }}
            activeOpacity={1}
          />
        )}

        <Button
          onPress={this._pickImage}
          title="Choose Profile Picture"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
