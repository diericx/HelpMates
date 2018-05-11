import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import Meteor from "react-native-meteor";
import Modal from "react-native-modal";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import { DateTo12HourTime } from "../../../Helpers/Date";
import { CText, CTextBold } from "../../general/CustomText";

import styles from "./styles";
import TextBox from "../../TextBox/index";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    // get start and end dates as objects from props
    this.state = {
      initialMessageText: "",
      multiSliderValue: [0, 100],
      multiSliderMin: 0,
      multiSliderMax: 100
    };
    // bind
    this.sendRequest = this.sendRequest.bind(this);
    this.updateInitialMessageText = this.updateInitialMessageText.bind(this);
  }

  // When we receive new props, attempt to update date for the multi slider
  // from the dates received
  componentWillReceiveProps(props) {
    if (props.startDate && props.endDate) {
      this.setState({
        multiSliderValue: [props.startDate.getTime(), props.endDate.getTime()],
        multiSliderMin: props.startDate.getTime(),
        multiSliderMax: props.endDate.getTime()
      });
    }
  }

  // Update the intial message the user will send in the state
  updateInitialMessageText(text) {
    this.setState({
      initialMessageText: text
    });
  }

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    });
  };

  sendRequest(startDate, endDate) {
    this.props.toggleModal();
    Meteor.call(
      "helpSessions.create",
      {
        studentId: Meteor.userId(),
        tutorId: this.props.userId,
        courseId: this.props.courseId,
        startDate: startDate,
        endDate: endDate,
        initialMessageText: this.state.initialMessageText
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
        }
        // Do whatever you want with the response
      }
    );
  }

  // Calculate the updated start and end date based on the selected values
  // of the multislider
  renderSelectedDateRangeText(startDate, endDate) {
    return (
      <View style={styles.dateRangeContainer}>
        <View style={{ flexDirection: "column" }}>
          <CTextBold>{DateTo12HourTime(startDate)}</CTextBold>
        </View>
        <View style={{ flexDirection: "column" }}>
          <CTextBold>{DateTo12HourTime(endDate)}</CTextBold>
        </View>
      </View>
    );

    return <Text />;
  }

  render() {
    let selectedStartDate = (selectedEndDate = null);
    // get the selected start and end date if possible
    if (this.props.startDate && this.props.endDate) {
      const startDateMilliseconds = new Date(this.props.startDate).getTime();
      const endDateMilliseconds = new Date(this.props.endDate).getTime();
      selectedStartDate = new Date(
        startDateMilliseconds +
          (this.state.multiSliderValue[0] - startDateMilliseconds)
      );
      selectedEndDate = new Date(
        endDateMilliseconds +
          (this.state.multiSliderValue[1] - endDateMilliseconds)
      );
    }

    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.toggleModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
      >
        <View style={styles.modalContainer}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataContainerTitle}>
              What do you need help with?{" "}
            </Text>
            <TextBox
              message={this.state.initialMessageText}
              updateInitialMessageText={this.updateInitialMessageText}
              placeholder="Assignment 1 and studying for the midterm"
            />

            {/* only render selected date range if selected date is available */}
            <View>
              {selectedStartDate === null && selectedEndDate === null
                ? null
                : this.renderSelectedDateRangeText(
                    selectedStartDate,
                    selectedEndDate
                  )}
            </View>

            <View style={styles.multiSliderContainer}>
              <MultiSlider
                values={[
                  this.state.multiSliderValue[0],
                  this.state.multiSliderValue[1]
                ]}
                sliderLength={250}
                onValuesChange={this.multiSliderValuesChange}
                min={this.state.multiSliderMin}
                max={this.state.multiSliderMax}
                step={900000} // 15 minutes in milliseconds
                snapped
              />
            </View>
          </View>

          <Button
            title="Send Request"
            disabled={this.state.initialMessageText.length < 10}
            textStyle={styles.sendButtonText}
            buttonStyle={styles.sendButtonContainer}
            onPress={() => {
              this.sendRequest(selectedStartDate, selectedEndDate);
            }}
          />
          {/* <TouchableOpacity
            onPress={this.sendRequest}
            disabled={this.state.message === ''}
            style={{ opacity: this.state.message === '' ? 0.7 : 1 }}
          >
            <View style={styles.sendButtonContainer}>
              <Text style={styles.sendButtonText}> SEND REQUEST </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </Modal>
    );
  }
}
