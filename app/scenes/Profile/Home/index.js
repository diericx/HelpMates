import React from 'react';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker } from 'expo';

import { SetProfilePic } from 'app/Helpers/Meteor';

import styles from './styles';

const options = {
  keyPrefix: 'uploads/',
  bucket: 'helpmatesmedia',
  region: 'us-west-2',
  accessKey: 'AKIAILPA326IOX6PA34Q',
  secretKey: '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',
  successActionStatus: 201,
};

const list = [
  {
    title: 'Availability',
    icon: 'av-timer',
    screen: 'Availability',
  },
  {
    title: 'Courses',
    icon: 'book',
    iconType: 'entypo',
    screen: 'Courses',
  },
  {
    title: 'Legal Notices',
    screen: 'Legal',
  }
];

const helpList = [
  {
    title: 'FAQ',
    icon: 'help',
    iconType: 'entypo',
    screen: 'FAQ',
  },
  {
    title: 'Report a problem',
    screen: 'ProblemReporting',
  }
];

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      profilePic: null,
    };
    // bind
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.setState({
      profilePic: Meteor.user().profile.profilePic,
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
      name: 'profilePic-' + Meteor.userId() + '.png',
      type: type,
    };

    // upload image
    RNS3.put(file, options).then(response => {
      if (response.status !== 201) throw new Error('Failed to upload image to S3');
      SetProfilePic(response.body.postResponse.location);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      this.setState({ profilePic: result.uri });
      this.uploadImage(result.type);
    }
  };

  render() {
    let { profilePic } = this.state;

    return (
      <View style={styles.container}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {profilePic && <Image source={{ uri: profilePic }} style={{ width: 200, height: 200 }} />}

        <List>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon, type: item.iconType }}
              onPress={() => this.onPress(item.screen)}
            />
          ))}
        </List>

        <Text>
          {"\n"}
          Need help?
        </Text>



        <Button onPress={this.logout} title="Logout" />
        <Image source={this.state.avatarSource} />
      </View>
    );
  }
}
