import React from 'react';
import firebase, { GetUniversities } from '../../../lib/Firebase';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

class UniversityList extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
    GetUniversities(universities => this.setState({
      universities,
      loading: false
    }));
  }

  keyExtractor = (item, index) => item.id

  render() {
    const { loading, universities } = this.state;
    if (loading) {
      return <ActivityIndicator />
    }

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={universities}
          renderItem={({item}) => 
            <ListItem
              key={item._id}
              // leftAvatar={{ source: { uri: l.avatar_url } }}
              title={item.name}
              subtitle={item.city}
              onPress={() => this.props.onPress(item) }
              chevron
            />
          }
        />
      </View>
    );
  }
}

export default UniversityList;
