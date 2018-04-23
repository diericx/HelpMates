import React from "react";
import Meteor, { createContainer } from "react-native-meteor";
import { View, Text, Button, ListView, DatePickerIOS } from "react-native";

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
      chosenDate: new Date()
    };
  }

  render() {
    const { availabilities } = this.props;
    return (
      <View style={styles.container}>
        <View>
          {/* <View style={styles.availabilitiesListContainer}>
            <ListView
              enableEmptySections
              dataSource={this.convertAvailabilitiesToArray(availabilities)}
              renderRow={rowData => <Text>{rowData}</Text>}
            />
          </View> */}
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={newDate => {
              this.setState({ chosenDate: newDate });
            }}
          />
          <Button
            onPress={() => this.addAvailability(this.state.chosenDate)}
            title="Add Availability"
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
