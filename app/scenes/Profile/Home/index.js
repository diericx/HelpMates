import React from "react";
import Meteor from "react-native-meteor";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { List, ListItem, Divider } from "react-native-elements";
// import { RNS3 } from 'react-native-aws3';
import { ImagePicker } from "expo";
import { UploadProfilePic } from "../../../Helpers/S3";

import { SetProfilePic } from "../../../Helpers/Meteor";
import ChooseAvatarPhoto from "../../../components/ChooseAvatarPhoto/index";

import styles from "./styles";

const options = {
  keyPrefix: "uploads/",
  bucket: "helpmatesmedia",
  region: "us-west-2",
  accessKey: "AKIAILPA326IOX6PA34Q",
  secretKey: "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",
  successActionStatus: 201
};

const list = [
  {
    title: "Availability",
    icon: "av-timer",
    screen: "Availability"
  },
  {
    title: "Courses",
    icon: "book",
    iconType: "entypo",
    screen: "MyCourses"
  }
];

const helpList = [
  {
    title: "Chat With Us!",
    icon: "chat",
    iconType: "entypo",
    screen: "AdminChat"
  },
  {
    title: "FAQ",
    icon: "help",
    iconType: "entypo",
    screen: "FAQ"
  },
  {
    title: "Legal Notices",
    icon: "gavel",
    iconType: "FontAwesome",
    screen: "Legal"
  }
];

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      profilePicURI: "",
      profilePicURL: Meteor.user().profile.profilePic
    };
    // bind
    this.onPress = this.onPress.bind(this);
    this.logout = this.logout.bind(this);
    this.onChoosePhoto = this.onChoosePhoto.bind(this);
    this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
  }

  componentDidMount() {
    this.setState({
      profilePic: Meteor.user().profile.profilePic
    });
  }

  onChoosePhoto(uri) {
    UploadProfilePic(uri, this.onProfilePicUpload);
  }

  onProfilePicUpload(url) {
    console.log("On Profile pic upload: ", url);
    // set the profile pic for this user in Meteor
    SetProfilePic(url);
    this.setState({
      profilePicURL: url
    });
  }

  async resetAnonymousKey() {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:anonymousKey");
      if (value == null) {
      }
      try {
        await AsyncStorage.removeItem("@MySuperStore:anonymousKey", null);
      } catch (error) {
        console.log("Error resetting anon key");
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  logout() {
    // Reset anon key
    this.resetAnonymousKey();
    // Logout
    Meteor.logout();
  }

  onPress(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    let { profilePicURL } = this.state;
    console.log(Meteor.user().profile.profilePic);

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {profilePic && (
            <Image
              source={{ uri: profilePic }}
              style={{ width: 200, height: 200 }}
            />
          )} */}
          <View style={styles.profilePicContainer}>
            <ChooseAvatarPhoto
              profilePicURI={Meteor.user().profile.profilePic}
              onChoosePhoto={this.onChoosePhoto}
            />
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.header}>HELP INFO</Text>

          <List containerStyle={styles.list}>
            {list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon, type: item.iconType }}
                onPress={() => this.onPress(item.screen)}
                containerStyle={styles.listItem}
              />
            ))}
          </List>

          <Divider style={styles.divider} />

          <Text style={styles.header}>SUPPORT</Text>

          <List containerStyle={styles.list}>
            {helpList.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon, type: item.iconType }}
                onPress={() => this.onPress(item.screen)}
                containerStyle={styles.listItem}
              />
            ))}
          </List>

          <Button onPress={this.logout} title="Logout" />
          <Image source={this.state.avatarSource} />
        </ScrollView>
      </View>
    );
  }
}
