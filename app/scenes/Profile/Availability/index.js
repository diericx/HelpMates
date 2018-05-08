import React from "react";
import Meteor, { createContainer } from "react-native-meteor";
import { View, Text, Button, ListView, Alert } from "react-native";

import CustomDatePicker from "../components/CustomDatePicker/index";
import Agenda from "../../../components/Agenda";
import SendRequestModal from "../../../components/modals/SendRequestModal/index";
import {
  ConvertAvailabilitiesToArray,
  AddAvailability
} from "../../../Helpers/Meteor";
import styles from "./styles";

class Availability extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate: new Date()
    };

    // bind
    this.onAddAvailabilityButtonPress = this.onAddAvailabilityButtonPress.bind(
      this
    );
  }

  // When the addAvailability button is pressed, send the request
  onAddAvailabilityButtonPress(data) {
    if (data.duration <= 0) {
      Alert.alert(
        "Time can be confusing",
        "Your end time needs to be later than your start time!",
        [
          {
            text: "Oh yeah..",
            onPress: () => console.log("Ask me later pressed")
          }
        ],
        { cancelable: false }
      );
    } else {
      AddAvailability(data.day, data.hours, data.minutes, data.duration);
      this.forceUpdate();
    }
  }

  render() {
    const { availabilities } = this.props;
    console.log(availabilities);
    const { chosenDate } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.addAvailabilityContainer}>
          <CustomDatePicker
            onAddAvailabilityButtonPress={this.onAddAvailabilityButtonPress}
          />
        </View>
        <Agenda
          modal={SendRequestModal}
          availabilities={availabilities}
          name={Meteor.user().profile.name}
          userId={Meteor.userId()}
        />
      </View>
    );
  }
}

// Bind this view to data
const container = createContainer(
  params => ({
    availabilities: Meteor.user().profile.availabilities
  }),
  Availability
);

container.navigationOptions = {
  headerTitle: "My Availability"
};

export default container;
