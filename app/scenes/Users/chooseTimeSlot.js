import React from 'react';
import Meteor from 'react-native-meteor';
import update from 'immutability-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar } from 'react-native';
import { Agenda } from 'react-native-calendars';

const styles = EStyleSheet.create({
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
      userId: params.id,
      selectedDate: new Date(),
      availabilities: [],
      items: {},
    };
    // get this users availabilities
    this.getAvailabilities();
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
                startTime: this.dateGet12HourTime(availabilityDate),
                endTime: this.dateGet12HourTime(
                  new Date(availabilityDate.getTime() + availability.length * 60000),
                ),
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

    // if (day.month != this.state.selectedDate.getMonth() + 1) {
    //   return;
    // }

    // setTimeout(() => {
    //   var date = new Date(day.dateString);
    //   console.log(date.getUTCDay());
    //   var dateStr = this.dateToString(date);
    //   console.log(date);
    //   console.log(dateStr);

    //   // reset items, make new array for selected day
    //   var newItems = {};
    //   newItems[dateStr] = [];

    //   // loop over availabilities and find one that fits in this day
    //   for (var i = 0; i < this.state.availabilities.length; i++) {
    //     var availability = this.state.availabilities[i];
    //     var availabilityDate = new Date(availability.date);
    //     var availabilityDateStr = this.dateToString(availabilityDate);
    //     console.log('-----');
    //     console.log(date.getUTCDay(), availabilityDate.getUTCDay());
    //     console.log(dateStr == availabilityDateStr);
    //     console.log(date.getUTCDay() - availabilityDate.getUTCDay() % 7 == 0);
    //     console.log(
    //       dateStr == availabilityDateStr || date.getUTCDay() == availabilityDate.getUTCDay(),
    //     );
    //     if (
    //       dateStr == availabilityDateStr ||
    //       date.getUTCDay() - availabilityDate.getUTCDay() % 7 == 0
    //     ) {
    //       newItems[dateStr].push({
    //         name: availabilityDateStr,
    //         height: 100,
    //       });
    //     }
    //   }

    //   this.setState({
    //     items: newItems,
    //   });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.startTime}</Text>
        <Text>{item.endTime}</Text>
      </View>
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
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

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

        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => <Text>{day ? day.day : 'item'}</Text>}
      />
    );
  }
}
