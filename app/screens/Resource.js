import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  }
});

class Resource extends React.Component {
  static navigationOptions = {
    title: 'Resource',
  };

  render() {
    let { resource } = this.props;
    
    console.log(resource.data);

    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

export default Resource;