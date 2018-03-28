import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { View, Text, Button, ListView, DatePickerIOS } from 'react-native';

import styles from './styles';

class Availability extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenDate: new Date(),
    };

    // bindings
    this.addAvailability = this.addAvailability.bind(this);
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
      { date: this.state.chosenDate, length: '60', repeats: true },
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
            onDateChange={(newDate) => {
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
const container = createContainer(
  params => ({
    availabilities: Meteor.user().profile.availabilities,
  }),
  Availability,
);

container.navigationOptions = {
  headerTitle: 'My Availability',
};

export default container;
