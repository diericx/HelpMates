import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import Meteor, { createContainer } from "react-native-meteor";
import { GiftedChat } from "react-native-gifted-chat";
import Faker from "faker";
import ActivityIndicator from "../../../components/general/ActivityIndicator";
import { SendMessageToCourse } from "../../../Helpers/Meteor";

import styles from "./styles";

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Faker.name.findName()
    };
    // bind
    this.onTakenCoursePress = this.onTakenCoursePress.bind(this);
    this.renderSessionData = this.renderSessionData.bind(this);
  }

  async componentWillMount() {
    // Set anonymous key from async
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:anonymousKey");
      if (value !== null) {
        // We have data!!
        this.setState({
          guid: value
        });
      } else {
        console.log("No anonymous key!");
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  // When a message is sent on client
  onSend(courseId, messages = []) {
    const message = messages[0];
    message.user.name = this.state.name;
    SendMessageToCourse(courseId, message);
  }

  onTakenCoursePress() {
    const { id } = this.props.navigation.state.params;
    // Get available courses from server
    Meteor.call(
      "users.addCompletedCourse",
      { courseId: id, rate: 15 },
      (err, res) => {
        // Do whatever you want with the response
        if (err) {
          console.log(err);
        }
      }
    );
  }

  // Render the chat UI element
  renderChat(conversation) {
    const { course } = this.props;
    if (conversation) {
      return (
        <GiftedChat
          messages={conversation.messages.reverse()}
          bottomOffset={50}
          onSend={messages => this.onSend(course._id, messages)}
          user={{
            _id: this.state.guid
          }}
          renderLoading={() => (
            <ActivityIndicator size="large" marginTop={35} />
          )}
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
            This is an anonymous chat. Have a question you were too embarresed
            to ask in class? Try getting help here!
          </Text>
        </View>
      );
    }
    // if the user has taken the course, show the message
    return (
      <View>
        <Text style={[styles.sessionDataText, styles.centerText]}>
          You've taken this course {"\n"} Answer questions to make some money!
        </Text>
      </View>
    );
  }

  render() {
    const { course } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.sessionDataContainer}>
          <View style={styles.sessionData}>{this.renderSessionData()}</View>
        </View>
        <View style={styles.chat}>{this.renderChat(course.conversation)}</View>
      </View>
    );
  }
}

const container = createContainer(params => {
  const { course } = params.navigation.state.params;
  Meteor.subscribe("course", { courseId: course._id });
  return {
    course: Meteor.collection("courses").findOne({
      _id: course._id
    })
  };
}, Show);

container.navigationOptions = ({ navigation }) => {
  const {
    state: { params = {} }
  } = navigation;
  return {
    headerTitle: params.course.title2 || "Course Chat"
  };
};

export default container;
