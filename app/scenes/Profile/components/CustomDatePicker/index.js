import React from "react";
import { View, Text, Picker, Button } from "react-native";
import { ButtonGroup } from "react-native-elements";

import TimePicker from "../TimePicker/index";
import styles from "./styles";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: 0,
      startTime: {
        hours: 1,
        minutes: 0,
        AMPM: 0
      },
      endTime: {
        hours: 1,
        minutes: 0,
        AMPM: 0
      }
    };

    //bind
    this.updateDay = this.updateDay.bind(this);
  }

  updateDay(selectedDay) {
    this.setState({ selectedDay });
  }

  onValueChange(key, value) {
    // update the state for this component
    this.setState({
      [key]: value
    });
    // callback for parent
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.date);
    }
  }

  render() {
    const dayButtons = ["S", "M", "T", "W", "T", "F", "S"];
    const { selectedDay } = this.state;
    const { day, hours, minutes, AMPM } = this.state;
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateDay}
          selectedIndex={selectedDay}
          buttons={dayButtons}
          containerStyle={{ height: 30 }}
        />

        <View style={styles.timePickersContainer}>
          <View style={styles.labelContainer}>
            <Text style={[styles.text, styles.labelText]}>From </Text>
          </View>

          <TimePicker
            time={this.state.startTime}
            onTimeChanged={newTime => {
              this.setState({
                startTime: newTime
              });
            }}
          />

          <View style={styles.labelContainer}>
            <Text style={[styles.text, styles.labelText]}> to </Text>
          </View>

          <TimePicker
            time={this.state.endTime}
            onTimeChanged={newTime => {
              this.setState({
                endTime: newTime
              });
            }}
          />
        </View>

        <Button
          onPress={() => {
            const { selectedDay, startTime, endTime } = this.state;
            var startHours = startTime.hours;
            var endHours = endTime.hours;
            var duration =
              endHours * 60 +
              endTime.minutes -
              (startHours * 60 + startTime.minutes);
            console.log("Start: ", startTime);
            console.log("End: ", endTime);
            console.log("Duration: ", duration);
            var data = {
              day: selectedDay,
              hours: startTime.hours,
              minutes: startTime.minutes,
              duration: duration
            };
            this.props.onAddAvailabilityButtonPress(data);
          }}
          title="Add Availability"
        />
      </View>
    );
  }
}

export default Index;
