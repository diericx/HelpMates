import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import TimeSlot from './timeSlot';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  timesContainer: {
    flexDirection: 'column',
  },
});

export default class TimePicker extends React.Component {
  renderDays() {
    const days = new Array(7).fill(0);
    const times = new Array(this.props.maxTime - this.props.minTime).fill(0);
    return (
      <View style={styles.daysContainer}>
        {days.map((v, d) => (
          <View style={styles.timesContainer}>
            {times.map((v2, t) => (
              <View>
                <TimeSlot day={d} time={this.props.minTime + t} />
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDays()}
        <Text> works </Text>
      </View>
    );
  }
}
