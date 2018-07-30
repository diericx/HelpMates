import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";
import SepperatorView from "../../SepperatorView";
import ListViewSubtitle from '../../ListViewSubtitle';

import styles from './styles';

export default class GroupList extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { courseId, auth } = this.props;
    const { firestore } = this.context.store;
    const path = `members.${[auth.uid]}`
    let whereQuery = courseId ? ['courseId', '==', courseId] : [path, '==', true]
    firestore.setListener({
      collection: 'groups',
      where: whereQuery,

    })
  }

  JoinGroup(groupId) {
    const { firestore } = this.context.store;
    const { auth } = this.props;
    const path = `members.${[auth.uid]}`
    firestore.collection('groups')
    .doc(groupId)
    .update({
      [path] : true
    })
  }

  LeaveGroup(groupId) {
    const { firestore } = this.context.store;
    const { auth } = this.props;
    const path = `members.${[auth.uid]}`
    firestore.collection('groups')
    .doc(groupId)
    .update({
      [path] : firestore.FieldValue.delete()
    })
  }

  render() {
    let { groups, courses, auth } = this.props;
    
    if (!groups) {
      return <ActivityIndicator />
    }
  
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={groups}
          renderItem={({item, index}) => {
            let { members } = item;
  
            let isUserInGroup = !(members[auth.uid] == null);
            let headCount = Object.keys(members).length;
    
            return (
              <SepperatorView renderTop={index==0} renderBottom={index==groups.length-1}>
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={<ListViewSubtitle subtitle={'TODO - Course Title'} userCount={headCount} />}
                  leftIcon={
                    {
                      name: "verified-user",
                      size: 35,
                      iconStyle: styles.icon
                    }
                  }
                  rightTitle={
                    this.props.onPress == null ? 
                    <Button
                      title=''
                      // titleStyle={styles.buttonTitle}
                      icon={
                        {
                          name: isUserInGroup ? 'highlight-off' : 'add-circle-outline', 
                          size: 35, 
                          color: 'black'
                        }
                      }
                      buttonStyle={styles.button}
                      onPress={isUserInGroup ? 
                        () => this.LeaveGroup(item.id) :
                        () => this.JoinGroup(item.id) }
                    />
                    :
                    null
                  }
                  onPress={this.props.onPress == null ? null : () => this.props.onPress(item)}
                  chevron={!(this.props.onPress == null)}
                />
              </SepperatorView>
            )
          }
            
          }
        />
      </View>
    );
  }

}
