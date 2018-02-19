import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const styles = EStyleSheet.create({
  modalContainer: {
    height: 400,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  dataContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dataContainerTitle: {
    fontFamily: 'OpenSansLight',
    fontSize: 23,
    marginTop: 30,
  },
  dataContainerText: {
    fontFamily: 'OpenSansLight',
  },
  sendButtonContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$green',
  },
  sendButtonText: {
    fontFamily: 'OpenSansLight',
    fontSize: 23,
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default class SendHelpSessionRequestModal extends React.Component {
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
      <Modal isVisible={this.props.isVisible} onBackdropPress={this.props.toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataContainerTitle}>Get help from {this.props.name} </Text>
            {this.renderDateRange()}
          </View>
          <TouchableOpacity onPress={this.toggleModal}>
            <View style={styles.sendButtonContainer}>
              <Text style={styles.sendButtonText}> SEND REQUEST </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
