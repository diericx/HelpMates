import React from 'react';
import Meteor from 'react-native-meteor';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import EStyleSheet from 'react-native-extended-stylesheet';

import { SendMessage } from '../../lib/Meteor';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: 'white'
  },
});

const Chat = (props) => {
  const { groupId, messages, ready } = props;

  if (!ready) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages.reverse()}
        onSend={messages => {
          let message = messages[0]
          SendMessage(groupId, message)
        }}
        user={{
          _id: Meteor.userId(),
          name: Meteor.user().profile.name,
        }}
      />
    </View>
  );
};

export default Chat
