import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Meteor from 'react-native-meteor';
import Document from '../components/Document';
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
    const resourceId = this.props.navigation.getParam("resourceId", null);
    const resourceType = this.props.navigation.getParam("resourceType", null);
    
    if (resourceType == "document") {
      return (
        <View style={styles.container}>
          <Document id={resourceId} />
        </View>
      )
    }
    
    return null;
  }
}

export default Resource;