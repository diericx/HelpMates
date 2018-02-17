import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  Text,
  Button,
  FlatList,
  StatusBar,
  Picker,
  ListView,
  DatePickerIOS,
} from 'react-native';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  rateContainer: {
    marginTop: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
  ratePicker: {
    width: '$screenWidth',
  },
  availabilitiesListContainer: {
    width: '$screenWidth',
    height: 80,
  },
});

class Tutor extends React.Component {
  static navigationOptions = {
    title: 'Tutor',
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
    // initialize state
    this.state = {
      rate: 5,
      chosenDate: new Date(),
    };

    // bindings
    this.rate = this.setRate.bind(this);
    this.addAvailability = this.addAvailability.bind(this);
  }

  // METEOR - set rate
  setRate(rate) {
    lastRate = this.state.rate;
    this.setState({ rate: rate });
    this.state.rate = rate;
    Meteor.call('users.setRate', { rate: this.state.rate }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
        // reset back to old rate if server didn't update
        this.setState({ rate: lastRate });
      }
    });
  }

  // METOER - get users availabilities
  convertAvailabilitiesToArray(availabilities) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    availabilities_array = availabilities.map(availability => availability.date.toString());
    return ds.cloneWithRows(availabilities_array);
  }

  // METEOR - add availability to profile
  addAvailability() {
    Meteor.call(
      'users.addAvailability',
      { date: this.state.chosenDate, repeats: true },
      (err, res) => {
        if (err) {
          console.log(err);
        }
      },
    );
  }

  render() {
    const { availabilities } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.rateContainer}>
          <Text style={styles.title}> Choose your help rate </Text>
          <View>
            <Picker
              style={styles.ratePicker}
              selectedValue={this.state.rate}
              onValueChange={(itemValue, itemIndex) => this.setRate(itemValue)}
            >
              <Picker.Item label="$5" value={5} />
              <Picker.Item label="$10" value={10} />
              <Picker.Item label="$15" value={15} />
              <Picker.Item label="$20" value={20} />
            </Picker>
          </View>
        </View>

        <View>
          <Text style={styles.title}> Set Your Availabilities </Text>
          <View style={styles.availabilitiesListContainer}>
            <ListView
              enableEmptySections
              dataSource={this.convertAvailabilitiesToArray(availabilities)}
              renderRow={rowData => <Text>{rowData}</Text>}
            />
          </View>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={newDate => {
              this.setState({ chosenDate: newDate });
            }}
          />
          <Button onPress={this.addAvailability} title="Add Availability" />
        </View>
      </View>
    );
  }
}

// Bind this view to data
export default createContainer(params => {
  return {
    availabilities: Meteor.user().profile.availabilities,
  };
}, Tutor);
