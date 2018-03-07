import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor, { createContainer } from 'react-native-meteor';
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
  sessionDataContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sessionData: {},
  sessionDataText: {
    color: 'gray',
    paddingVertical: 5,
  },
  takenCourseButton: {
    height: 45,
    backgroundColor: '$green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    width: '$screenWidth - 50',
    marginBottom: 10,
  },
});

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Faker.name.findName(),
      guid: GUID(),
    };
    // bind
    this.onTakenCoursePress = this.onTakenCoursePress.bind(this);
    this.renderSessionData = this.renderSessionData.bind(this);
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
        <Text style={styles.sessionDataText}>You've taken this course!</Text>
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