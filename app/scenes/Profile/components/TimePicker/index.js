import React from "react";
import { View, Text, Picker } from "react-native";
import { ButtonGroup } from "react-native-elements";

import styles from "./styles";

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.time;
  }
  onValueChange(key, value) {
    // update the state for this component
    this.setState(
      {
        [key]: value
      },
      function() {
        // callback for parent
        if (this.props.onTimeChanged) {
          this.props.onTimeChanged({
            hours: this.state.hours + this.state.AMPM * 12,
            minutes: this.state.minutes,
            AMPM: this.state.AMPM
          });
        }
      }
    );
  }

  render() {
    const { hours, minutes, AMPM } = this.state;
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={hours}
          style={styles.pickerStyle}
          itemStyle={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) =>
            this.onValueChange("hours", itemValue)
          }
        >
          <Picker.Item label="01" value={1} />
          <Picker.Item label="02" value={2} />
          <Picker.Item label="03" value={3} />
          <Picker.Item label="04" value={4} />
          <Picker.Item label="05" value={5} />
          <Picker.Item label="06" value={6} />
          <Picker.Item label="07" value={7} />
          <Picker.Item label="08" value={8} />
          <Picker.Item label="09" value={9} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="11" value={11} />
          <Picker.Item label="12" value={12} />
        </Picker>

        <Text style={styles.text}>:</Text>

        <Picker
          selectedValue={minutes}
          style={styles.pickerStyle}
          itemStyle={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) =>
            this.onValueChange("minutes", itemValue)
          }
        >
          <Picker.Item label="00" value={0} />
          <Picker.Item label="05" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="25" value={25} />
          <Picker.Item label="30" value={30} />
          <Picker.Item label="35" value={35} />
          <Picker.Item label="40" value={40} />
          <Picker.Item label="45" value={45} />
          <Picker.Item label="50" value={50} />
          <Picker.Item label="55" value={55} />
        </Picker>
        <Picker
          selectedValue={AMPM}
          style={[styles.pickerStyle, styles.pickerStyleMedium]}
          itemStyle={[styles.pickerStyle, styles.pickerStyleMedium]}
          onValueChange={(itemValue, itemIndex) =>
            this.onValueChange("AMPM", itemValue)
          }
        >
          <Picker.Item label="AM" value={0} />
          <Picker.Item label="PM" value={1} />
        </Picker>
      </View>
    );
  }
}
