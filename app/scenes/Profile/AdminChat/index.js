import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Meteor, { createContainer } from 'react-native-meteor';
import { GiftedChat } from 'react-native-gifted-chat';
import Faker from 'faker';
import ActivityIndicator from 'app/components/general/ActivityIndicator';
import { SendMessage } from 'app/Helpers/Meteor';

import styles from './styles';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  // When a message is sent on client
  onSend(convoId, messages = []) {
    const message = messages[0];
    message.user.name = this.state.name;
    SendMessage(convoId, message);
  }

  // Render the chat UI element
  renderChat(conversation) {
    if (conversation) {
      return (
        <GiftedChat
          messages={conversation.messages.reverse()}
          bottomOffset={50}
          onSend={messages => this.onSend(conversation._id, messages)}
          user={{
            _id: this.state.guid,
          }}
          renderLoading={() => <ActivityIndicator size="large" marginTop={35} />}
        />
      );
    }
    return <View />;
  }

  render() {
    const { conversation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.chat}>{this.renderChat(conversation)}</View>
      </View>
    );
  }
}

const container = createContainer((params) => {
  // const { course } = params.navigation.state.params;
  // Meteor.subscribe('getConversation', { id: course.conversationId });
  return {
    conversation: Meteor.collection('conversations').findOne(),
  };
}, Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    headerTitle: params.title || 'Admin Chat',
  };
};

export default container;
