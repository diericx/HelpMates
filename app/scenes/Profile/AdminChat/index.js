import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import Meteor, { createContainer } from "react-native-meteor";
import { GiftedChat } from "react-native-gifted-chat";
import Faker from "faker";
import ActivityIndicator from "app/components/general/ActivityIndicator";
import { SendMessageToSupport } from "app/Helpers/Meteor";

import styles from "./styles";

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  // When a message is sent on client
  onSend(messages = []) {
    const message = messages[0];
    message.user.name = Meteor.user().profile.name;
    SendMessageToSupport(Meteor.userId(), message);
  }

  // Render the chat UI element
  renderChat(messages) {
    if (messages) {
      return (
        <GiftedChat
          messages={messages.reverse()}
          bottomOffset={50}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: Meteor.userId()
          }}
          renderLoading={() => (
            <ActivityIndicator size="large" marginTop={35} />
          )}
        />
      );
    }
    return <View />;
  }

  render() {
    const { messages } = Meteor.user();
    return (
      <View style={styles.container}>
        <View style={styles.chat}>{this.renderChat(messages)}</View>
      </View>
    );
  }
}

const container = createContainer(params => {
  return {};
}, Show);

container.navigationOptions = ({ navigation }) => {
  const {
    state: { params = {} }
  } = navigation;
  return {
    headerTitle: params.title || "Admin Chat"
  };
};

export default container;
