import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Chat from '../../components/shared/Chat/Chat';
import NavigationService from '../../config/navigationService';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

@compose(
  firestoreConnect(({ navigation }) => {
    // Get groupId from navigation params
    const groupId = navigation.getParam('groupId', null);
    // Return query config
    return [
      {
        collection: 'groups',
        doc: groupId,
        orderBy: ['createdAt'],
        subcollections: [{ collection: 'messages' }],
        storeAs: `messages-${groupId}`,
      },
    ];
  }),
  connect(({ firestore: { data } }, { navigation }) => {
    // Get groupId from navigation params
    const groupId = navigation.getParam('groupId', null);
    return {
      messages: data[`messages-${groupId}`],
      groupId,
    };
  })
)
class Group extends React.Component {
  /**
   * Sends a message to the group
   * @param {Object} message - The message to be sent
   */
  sendMessage(message) {
    const { firestore, groupId } = this.props;
    firestore.add(
      {
        collection: 'groups',
        doc: groupId,
        subcollections: [{ collection: 'messages' }],
      },
      {
        ...message,
        likes: {},
      }
    );
  }

  render() {
    const { messages } = this.props;
    return (
      <View style={styles.container}>
        <Chat messages={messages} sendMessage={this.sendMessage} />
      </View>
    );
  }
}

export default Group;
