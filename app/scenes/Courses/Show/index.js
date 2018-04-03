import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Meteor, { createContainer } from 'react-native-meteor';
import { GiftedChat } from 'react-native-gifted-chat';
import Faker from 'faker';
import ActivityIndicator from '../../../components/general/ActivityIndicator';
import { SendMessage } from '../../../Helpers/Meteor';

import styles from './styles';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Faker.name.findName(),
    };
    // bind
    this.onTakenCoursePress = this.onTakenCoursePress.bind(this);
    this.renderSessionData = this.renderSessionData.bind(this);
  }

  async componentWillMount() {
    // Set anonymous key from async
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:anonymousKey');
      if (value !== null) {
        // We have data!!
        this.setState({
          guid: value,
        });
      } else {
        console.log('No anonymous key!');
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  // When a message is sent on client
  onSend(convoId, messages = []) {
    const message = messages[0];
    message.user.name = this.state.name;
    SendMessage(convoId, message);
  }

  onTakenCoursePress() {
    const { id } = this.props.navigation.state.params;
    // Get available courses from server
    Meteor.call('users.addCompletedCourse', { courseId: id, rate: 15 }, (err, res) => {
      // Do whatever you want with the response
      if (err) {
        console.log(err);
      }
    });
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

  renderSessionData() {
    const { id } = this.props.navigation.state.params;
    if (!Meteor.user().profile.completedCourses[id]) {
      // if the user hasn't taken the course, show the add taken course button
      return (
        <View>
          <Text style={styles.sessionDataText}>
            Let everyone know you can help them with this class!
          </Text>
          {this.renderSessionDataActionButtons()}
        </View>
      );
    }
    // if the user has taken the course, show the message
    return (
      <View>
        <Text style={[styles.sessionDataText, styles.centerText]}>
          You've taken this course {'\n'} Answer questions to make some money!
        </Text>
      </View>
    );
  }

  renderSessionDataActionButtons() {
    return (
      <Button
        title="I've taken this course"
        textStyle={{ fontWeight: '700' }}
        buttonStyle={styles.takenCourseButton}
        containerStyle={{ marginTop: 20 }}
        onPress={this.onTakenCoursePress}
      />
    );
  }

  render() {
    const { conversation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.sessionDataContainer}>
          <View style={styles.sessionData}>{this.renderSessionData()}</View>
        </View>
        <View style={styles.chat}>{this.renderChat(conversation)}</View>
      </View>
    );
  }
}

const container = createContainer((params) => {
  const { course } = params.navigation.state.params;
  Meteor.subscribe('getConversation', { id: course.conversationId });
  return {
    conversation: Meteor.collection('conversations').findOne(),
  };
}, Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    headerTitle: params.title || 'Course Chat',
  };
};

export default container;
