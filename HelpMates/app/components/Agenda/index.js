import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";

import {
  DateToLocalString,
  DateTo12HourTime,
  DateToString
} from "../../Helpers/Date";

import styles from "./styles";

const MIN_HEIGHT = 75;
const MAX_HEIGHT = 200;

export default class UserAgenda extends React.Component {
  constructor(props) {
    super(props);
    // set state
    this.state = {
      items: {},
      startDate: null,
      endDate: null,
      isModalVisible: false
    };
    // bindings
    this.loadItemsForMonth = this.loadItemsForMonth.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyDate = this.renderEmptyDate.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this.rowHasChanged = this.rowHasChanged.bind(this);
  }

  componentWillReceiveProps(nextProps, oldProps) {
    this.loadItemsForMonth({});
  }

  // When a time slot is pressed
  onTimeSlotPress(item) {
    let { startDate, endDate, index } = item;
    this.setState({
      startDate,
      endDate
    });
    if (this.props.modal) {
      this._toggleModal();
    } else {
      if (this.props.onTimeSlotPress) {
        this.props.onTimeSlotPress(item);
      }
    }
  }

  // Toggle the modal
  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  loadItemsForMonth(day) {
    const items = {};
    var today = new Date();
    const month = moment(
      `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
      "YYYY-MM-DD"
    );
    console.log("MONTH: ", `${month.format("DD")}`);
    setTimeout(() => {
      for (let j = 0; j <= 64; j += 1) {
        items[`${month.format("YYYY-MM-DD")}`] = [];

        const availTimesForDay = this.props.availabilities[month.weekday()];
        for (let i = 0; i < availTimesForDay.length; i++) {
          // get data for this availability
          const availability = availTimesForDay[i];
          // const availability = this.props.availabilities[i];
          // const availabilityDate = new Date(availability.date);
          // if it is the same day of the week
          // create new date on dateInc day, with availability time
          var availabilityDate = new Date(month);
          availabilityDate.setHours(availability.hours);
          availabilityDate.setMinutes(availability.minutes);

          var height = availability.duration / 2;
          if (height < MIN_HEIGHT) {
            height = MIN_HEIGHT;
          }
          if (height > MAX_HEIGHT) {
            height = MAX_HEIGHT;
          }

          items[`${month.format("YYYY-MM-DD")}`].push({
            startDate: availabilityDate,
            endDate: new Date(
              availabilityDate.getTime() + availability.duration * 60000
            ),
            height: height,
            index: i
          });
        }

        month.add(1, "days");
      }

      this.setState({
        items
      });
    }, 1000);
  }

  rowHasChanged(r1, r2) {
    return r1 != r2;
  }

  // Render a time slot
  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onTimeSlotPress(item);
        }}
      >
        <View style={[styles.item, { height: item.height }]}>
          <View style={styles.itemTimes}>
            <Text style={{ color: "lightgray" }}>
              {DateTo12HourTime(item.startDate)}
            </Text>

            <Text style={{ color: "lightgray" }}>
              {DateTo12HourTime(item.endDate)}
            </Text>
          </View>
          <View style={styles.itemNote}>
            <Text style={{ color: "lightgray" }}>{this.props.note}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Render a day with no time slots
  renderEmptyDate() {
    return <View style={styles.emptyDate} />;
  }

  render() {
    const today = new Date();
    const todayString = DateToLocalString(today);
    return (
      <View style={styles.container}>
        {this.props.modal ? (
          <this.props.modal
            name={this.props.name}
            userId={this.props.userId}
            courseId={this.props.courseId}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            isVisible={this.state.isModalVisible}
            toggleModal={this._toggleModal}
          />
        ) : null}

        <Agenda
          items={this.state.items}
          loadItemsForMonth={day => this.loadItemsForMonth(day)}
          selected={todayString}
          minDate={todayString}
          renderItem={this.renderItem}
          // renderDay={this.renderDay.bind(this)}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          pastScrollRange={1}
          futureScrollRange={50}
          // onDayPress={(day) => {
          //   this.setState({ selectedDate: new Date(day.dateString) });
          // }}
        />
      </View>
    );
  }
}
