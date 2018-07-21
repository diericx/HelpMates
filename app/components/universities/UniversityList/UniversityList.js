import React from 'react';

import PropTypes from 'prop-types'

// import firebase, { GetUniversities } from '../../../lib/Firebase';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

export default class UniversityList extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { firestore } = this.context.store
    firestore.get('universities')
  }

  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  keyExtractor = (item, index) => item.id

  render() {
    const { universities } = this.props

    if (!universities) {
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
