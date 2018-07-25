import React from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import Meteor from 'react-native-meteor';
import { ListItem } from 'react-native-elements';
import { MeteorComplexListView } from 'react-native-meteor';
import { Ionicons } from '@expo/vector-icons';

import NavBar from '../navigation/NavBar';

import styles from './styles';

const renderSearchPlaceholder = (props) => {
  return (
    <View style={styles.searchBarContainer} >
      <Ionicons name="md-search" size={30} color={"white"} />

      <TouchableWithoutFeedback onPress={props.onOpenSearchOverlay}>
        <View>
          <Text style={styles.placeholderText}>{props.text || "Search"}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const renderGroupActionButton = (group) => {
  if (group.members.includes(Meteor.userId())) {
    return (
      <TouchableWithoutFeedback onPress={() => LeaveGroup(group._id)}>
        <Ionicons name="ios-checkmark-circle" size={40} color={"white"}/>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <TouchableWithoutFeedback onPress={() => JoinGroup(group._id)}>
      <Ionicons name="ios-add-circle-outline" size={40} color={"white"}/>
    </TouchableWithoutFeedback>
  )
  
}

const Search = (props) => {
  const { groupsReady } = props;
  const allGroups = props.myGroups.concat(props.groups)

  if (!groupsReady) {
    return null
  }

  if (props.placeholder) {
    return renderSearchPlaceholder(props)
  }

  return (
    <View style={styles.container}>
      <NavBar placeholder isSearch={true} text={"Search"}>
        <View style={styles.searchBarContainer} >
            <Ionicons name="md-search" size={30} color={"white"} />
            
            <TextInput
              placeholder='Search'
              placeholderTextColor="lightgray"
              inputContainerStyle={styles.searchInputContainer}
              editable = {true}
              maxLength = {25}
              style={styles.searchInput}
              width={230}
              autoFocus={true}
            />
            
            <TouchableWithoutFeedback onPress={props.onCloseSearchOverlay}>
              <Ionicons name="md-close" size={30} color={"white"} />
            </TouchableWithoutFeedback>
        </View>
      </NavBar>

      <View style={styles.searchContentcontainer}>
        {!groupsReady && <ActivityIndicator/>}
        <MeteorComplexListView
          elements={() => allGroups}
          keyboardShouldPersistTaps='handled'
          renderRow={(group, _, i) => (
            <ListItem
              containerStyle={[
                styles.group,
                i == 0 && styles.firstGroup,
                i == allGroups.length - 1 && styles.lastGroup
              ]}
              key={group._id}
              title={group.title}
              subtitle={group.members.length + " people"}
              titleStyle={styles.groupTitle}
              subtitleStyle={styles.groupSubtitle}
              rightIcon={
                renderGroupActionButton(group)
              }
            />
          )
            
          }
        />
      </View>

    </View>
  );
};

export default Search;
