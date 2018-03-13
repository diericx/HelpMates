import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor from 'react-native-meteor';
import Modal from 'react-native-modal';

import styles from './styles';
import TextBox from '../TextBox/index';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialMessageText: '',
    };
    // bind
    this.sendRequest = this.sendRequest.bind(this);
    this.updateInitialMessageText = this.updateInitialMessageText.bind(this);
  }

  updateInitialMessageText(text) {
    this.setState({
      initialMessageText: text,
    });
  }

  loadItems(day) {
    setTimeout(() => {
      const today = new Date();
      const todayLocal = DateToLocalString(today);
      const dateInc = new Date(today.getUTCFullYear(), day.month - 1, 1);

      console.log(todayLocal);

      while (dateInc.getMonth() + 1 == day.month) {
        const dateIncStr = DateToString(dateInc);

        // if this day of the month hasn't been populated yet
        if (!this.state.items[dateIncStr]) {
          this.state.items[dateIncStr] = [];
          // populate it with info from availabilities
          for (let i = 0; i < this.state.availabilities.length; i++) {
            // get data for this availability
            const availability = this.state.availabilities[i];
            const availabilityDate = new Date(availability.date);
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
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  sendRequest() {
    Meteor.call(
      'helpSessions.create',
      {
        studentId: Meteor.userId(),
        tutorId: this.props.userId,
        courseId: this.props.courseId,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        initialMessageText: this.state.initialMessageText,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.props.toggleModal();
        }
        // Do whatever you want with the response
      },
    );
  }

  renderDateRange() {
    if (this.props.startDate && this.props.endDate) {
      return (
        <Text style={styles.dataContainerText}>
          From {this.props.startDate.toString()} {'\n'} to {this.props.endDate.toString()}
        </Text>
      );
    }
    return <Text />;
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.toggleModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
      >
        <View style={styles.modalContainer}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataContainerTitle}>What do you need help with? </Text>
            <TextBox
              message={this.state.initialMessageText}
              updateInitialMessageText={this.updateInitialMessageText}
              placeholder="Assignment 1 and studying for the midterm"
            />
          </View>

          <Button
            title="Send Request"
            disabled={this.state.initialMessageText.length < 10}
            textStyle={styles.sendButtonText}
            buttonStyle={styles.sendButtonContainer}
            onPress={this.sendRequest}
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
