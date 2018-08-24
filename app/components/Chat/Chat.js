import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import EStyleSheet from 'react-native-extended-stylesheet';
import STYLE_CONSTS from "../../config/styles";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});

export default class Chat extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { groupId } = this.props;
    const { firestore } = this.context.store;
    firestore.setListener({
      collection: 'groups',
      doc: groupId,
      orderBy: ['createdAt'],
      storeAs: `messages-${groupId}`,
      subcollections: [{ collection: 'messages' }]
    })
  }
 
  sendMessage(message) {
    const { groupId } = this.props;
    const { firestore } = this.context.store;
    firestore.add({ 
      collection: 'groups',
      doc: groupId,
      subcollections: [{ collection: 'messages' }]
    }, message)
  }

  render() {
    let { group, messages, auth, profile } = this.props;

    if (!group || !messages) {
      return <ActivityIndicator />
    }

    // Format the messages from an object to an array and also handle some 
    //  object inequalities.
    messages = Object.keys(messages).map((key) => {
      let message = messages[key];
      // If createdAt was sent from Firestore, it is a Timestamp object
      //  so we need to convert it to a js date.
      if (message.createdAt && message.createdAt.toDate) {
        message.createdAt = message.createdAt.toDate();
      }
      return {
        _id: key,
        ...message
      }
    })
  
    return (
      <View style={styles.container}>
        <GiftedChat
          bottomOffset={45}
          renderLoading={() => <ActivityIndicator />}
          messages={messages.reverse()}
          onSend={messages => {
            let message = messages[0];
            delete message._id;
            this.sendMessage(message);
          }}
          user={{
            _id: auth.uid,
            name: profile.name,
          }}
        />
      </View>
    );
  }

}
