import React from 'react';

import PropTypes from 'prop-types'

// import firebase, { GetUniversities } from '../../../lib/Firebase';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from "react-native-elements";
import SepperatorView from '../../SepperatorView';
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
          renderItem={({item, index}) => 
            <SepperatorView renderTop={index==0} renderBottom={index==universities.length-1}>
              <ListItem
                key={item._id}
                title={item.title}
                subtitle={`${item.city}, ${item.state}`}
                onPress={() => this.props.onPress(item) }
                leftIcon={{ name: 'school', size: 30 }}
                chevron
              />
            </SepperatorView>
          }
        />
      </View>
    );
  }
}
