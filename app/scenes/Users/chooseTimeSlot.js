import React from 'react';
import Meteor from 'react-native-meteor';
import update from 'immutability-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 100,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default class ChooseTimeSlot extends React.Component {
  static navigationOptions = {
    title: 'Pick a time',
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

  constructor(props) {
    super(props);
    // params from navigation
    const { params } = this.props.navigation.state;
    this.state = {
      params: params,
      userId: params.id,
      selectedDate: new Date(),
      availabilities: [],
      items: {},
    };
    // get this users availabilities
    this.getAvailabilities();
    // bind functions
    this.onTimeSlotPress = this.onTimeSlotPress.bind(this);
  }

  loadItems(day) {
    setTimeout(() => {
      var today = new Date();
      var todayLocal = this.dateToLocalString(today);
      var dateInc = new Date(today.getUTCFullYear(), day.month - 1, 1);

      console.log(todayLocal);

      while (dateInc.getMonth() + 1 == day.month) {
        var dateIncStr = this.dateToString(dateInc);

        // if this day of the month hasn't been populated yet
        if (!this.state.items[dateIncStr]) {
          this.state.items[dateIncStr] = [];
          // populate it with info from availabilities
          for (var i = 0; i < this.state.availabilities.length; i++) {
            // get data for this availability
            var availability = this.state.availabilities[i];
            var availabilityDate = new Date(availability.date);
            // if it is the same day of the week
            if (dateInc.getUTCDay() == availabilityDate.getUTCDay()) {
              this.state.items[dateIncStr].push({
                startDate: availabilityDate,
                endDate: new Date(availabilityDate.getTime() + availability.length * 60000),
                height: 100,
              });
            }
          }
        }
        dateInc.setDate(dateInc.getDate() + 1);
      }

      // update items with new object to give a sense of immutability
      // this seems kinda fucked up to me
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  // CALENDAR RENDER FUNCTIONS
  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onTimeSlotPress(item.startDate, item.endDate);
        }}
      >
        <View style={[styles.item, { height: item.height }]}>
          <Text>{this.dateGet12HourTime(item.startDate)}</Text>
          <Text>{this.dateGet12HourTime(item.endDate)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderDay(day, item) {
    if (day) {
      if (day.dateString == this.dateToString(this.state.selectedDate)) {
        return (
          <View>
            <Text> {day.dateString} </Text>
          </View>
        );
      }
    }
    console.log(day);
    // console.log(item);
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>{this.state.params.name} is not available on this day!</Text>
      </View>
    );
  }

  // CALENDAR BUTTON CALLBACKS
  onTimeSlotPress() {
    console.log('Pressed time slot!');
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  // DATE HELPER FUNCTIONS
  timeToString(time) {
    const date = new Date(time);
    return this.dateToString(date);
  }

  dateToString(date) {
    return date.toISOString().split('T')[0];
  }

  dateGet12HourTime(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if (hour > 12) {
      return (hour - 12).toString() + ':' + minutes + 'PM';
    }
    return hour.toString() + ':' + minutes + 'AM';
  }

  dateToLocalString(date) {
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    if (month.length == 1) {
      month = '0' + month;
    }
    if (day.length == 1) {
      day = '0' + date;
    }
    return date.getUTCFullYear() + '-' + month + '-' + day;
  }

  // METEOR - get availabilities for this user
  getAvailabilities() {
    Meteor.call('users.getAvailabilities', { userId: this.state.userId }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ availabilities: res });
    });
  }

  render() {
    var today = new Date();
    var todayString = this.dateToLocalString(today);
    return (
      <View style={styles.container}>
        <Text> asdf asf saf asf asf as </Text>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={todayString}
          minDate={todayString}
          renderItem={this.renderItem.bind(this)}
          // renderDay={this.renderDay.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          pastScrollRange={1}
          onDayPress={day => {
            this.setState({ selectedDate: new Date(day.dateString) });
          }}
        />
      </View>
    );
  }
}
