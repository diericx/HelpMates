import React from "react";
import Meteor, { createContainer } from "react-native-meteor";
import { View, FlatList, Button, Text } from "react-native";
import { Input } from "react-native-elements";
import { CButton } from "../../../components/general/Button";
import styles from "./styles";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0
    };
    // bind
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
    this.onRateInputChange = this.onRateInputChange.bind(this);
    this.onRemoveCourseButtonPress = this.onRemoveCourseButtonPress.bind(this);
    // this.onAddCourseButtonPress = this.onAddCourseButtonPress.bind(this);
  }

  componentWillMount() {
    const { course } = this.props;
    const rate = Meteor.user().profile.completedCourses[course._id];
    this.setState({
      rate: rate
    });
  }

  // onAddCourseButtonPress() {
  //   console.log(this.props.navigation);
  //   this.props.navigation.navigate('AddCourse');
  // }

  // METEOR - remove course
  removeCourse(courseId) {
    Meteor.call("users.removeCompletedCourse", { courseId }, (err, res) => {
      if (err) {
        console.log("Error: ", err);
      }
    });
  }

  // METEOR - set rate
  setRateForCourse(courseId, rate) {
    rate = Number(rate);
    if (!rate) {
      return;
    }
    console.log("Setting rate for course: ", courseId, "Rate: ", rate);
    Meteor.call("users.setRateForCourse", { courseId, rate }, (err, res) => {
      if (err) {
        console.log("Error: ", err);
      }
    });
  }

  // When the user taps the save button
  onSaveButtonPress() {
    const { course } = this.props;
    this.setRateForCourse(course._id, this.state.rate);
    this.props.navigation.goBack();
  }

  // When the remove course button is pressed, remove the course then go back
  onRemoveCourseButtonPress() {
    const { course } = this.props;
    this.removeCourse(course._id);
    this.props.navigation.goBack();
  }

  // When the rate input is changed
  onRateInputChange(text) {
    this.setState({
      rate: text
    });
  }

  render() {
    const { course } = this.props;
    const rate = Meteor.user().profile.completedCourses[course._id];
    // if the data is here and ready, load the list
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text> Your rate for this course </Text>
          <Input
            placeholder="Enter your rate for this course"
            value={this.state.rate.toString()}
            onChangeText={this.onRateInputChange}
            number-pad
            numeric
          />
          <CButton
            title="Save"
            onPress={this.onSaveButtonPress}
            containerStyle={styles.buttonContainer}
          />
        </View>

        <View>
          <CButton
            title="Remove Course"
            onPress={this.onRemoveCourseButtonPress}
            buttonStyle={{ backgroundColor: "red" }}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    );
  }
}

const container = createContainer(params => {
  const { course } = params.navigation.state.params;
  // subscribe to meteor collections
  Meteor.subscribe("course", { _id: course._id });
  return {
    course: Meteor.collection("courses").findOne({ _id: course._id })
  };
}, Index);

container.navigationOptions = ({ navigation }) => ({
  headerTitle: "Edit"
});

export default container;
