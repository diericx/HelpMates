import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor from 'react-native-meteor';
import Modal from 'react-native-modal';

import TextBox from './TextBox/index';

const styles = EStyleSheet.create({
  modalContainer: {
    height: 250,
    width: '100%',
    marginBottom: 300,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  dataContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dataContainerTitle: {
    fontFamily: 'OpenSans',
    fontSize: 23,
    marginTop: 30,
  },
  dataContainerText: {
    fontFamily: 'OpenSansLight',
    marginTop: 20,
  },
  sendButtonContainer: {
    height: 60,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '$green',
  },
  sendButtonText: {
    fontFamily: 'OpenSans',
    fontSize: 23,
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default class SendHelpSessionRequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    // bind
    this.sendRequest = this.sendRequest.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  updateMessage(text) {
    this.setState({
      message: text,
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
        message: this.state.message,
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
            <TextBox message={this.message} updateMessage={this.updateMessage} />
          </View>

          <Button
            title="Send Request"
            disabled={this.state.message.length < 10}
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
