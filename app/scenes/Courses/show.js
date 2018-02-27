import React from 'react';
import { View, Text, Button, FlatList, StatusBar, AsyncStorage } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor, { Accounts, createContainer } from 'react-native-meteor';
import { GiftedChat } from 'react-native-gifted-chat';
import Faker from 'faker';
import { SendMessage, GUID } from '../../Helpers/Meteor';

const UNI_ID = 'bJ2ppiHYrMFRThfWE';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  chat: {
    flex: 1,
  },
});

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Faker.name.findName(),
      guid: GUID(),
    };
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
  const { id } = params.navigation.state.params;
  Meteor.subscribe('courseChat', { id });
  return {
    conversation: Meteor.collection('conversations').findOne(),
  };
}, Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    title: params.title || 'Course Chat',
    headerStyle: {
      backgroundColor: '#cd84f1',
    },

    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'Milkshake',
    },
  };
};

export default container;
