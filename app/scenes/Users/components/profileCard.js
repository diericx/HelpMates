import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Avatar, Rating } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    height: 180,
  },
  profileImageContainer: {
    justifyContent: 'center',
    marginLeft: 30,
  },
  profileDataContainer: {
    justifyContent: 'center',
    marginLeft: 30,
  },
  nameText: {
    fontFamily: 'OpenSansBold',
    fontSize: 25,
  },
});

export default class ProfileCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <Avatar
            width={120}
            height={120}
            rounded
            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }}
            activeOpacity={1}
          />
        </View>

        <View style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{this.props.name}</Text>
          <Rating imageSize={20} readonly startingValue={3} />
        </View>
      </View>
    );
  }
}
