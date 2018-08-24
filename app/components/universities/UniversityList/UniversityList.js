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
      return (
        <View style={styles.container}>
          <View style={styles.header} >
            <Text style={[styles.headerText, this.props.headerTextStyle]}> Choose Your University </Text>
          </View>

          <ActivityIndicator size={"large"} />
        </View>
      )     
      
      
    }

    return (
      <View style={styles.container}>
        <View style={styles.header} >
          <Text style={[styles.headerText, this.props.headerTextStyle]}> Choose Your University </Text>
        </View>

        <FlatList
          keyExtractor={this.keyExtractor}
          data={universities}
          scrollEnabled={this.props.scrollEnabled}
          renderItem={({item, index}) => {
            let { color, backgroundColor } = item;
            return (
              <View style={styles.universityContainer}>
                <ListItem
                  key={item._id}
                  title={item.title}
                  subtitle={`${item.city}, ${item.state}`}
                  onPress={() => this.props.onPress(item) }
                  leftIcon={{ name: 'school', size: 30, color }}
                  titleStyle={{color}}
                  subtitleStyle={{color}}
                  containerStyle={[styles.university, {backgroundColor}]}
                  chevron
                />
              </View>
            )
          }}
        />
      </View>
    );
  }
}
