import React from "react";
import Meteor from "react-native-meteor";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { List, ListItem, Divider } from "react-native-elements";
// import { RNS3 } from 'react-native-aws3';
import { ImagePicker } from "expo";

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
  }

  componentDidMount() {
    this.setState({
      profilePic: Meteor.user().profile.profilePic
    });
  }

  logout() {
    Meteor.logout();
  }

  onPress(screen) {
    this.props.navigation.navigate(screen);
  }

  uploadImage(type) {
    // setup image to upload
    const { profilePic } = this.state;
    if (!profilePic) {
      return;
    }
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: profilePic,
      name: "profilePic-" + Meteor.userId() + ".png",
      type: type
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.setState({ profilePic: result.uri });
      this.uploadImage(result.type);
    }
  };

  render() {
    let { profilePicURL } = this.state;

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
            <ChooseAvatarPhoto profilePicURI={this.state.profilePicURL} />
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
