import React from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  modal: {
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  fileTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  fileTypeButton: {
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  selected: {
    backgroundColor: '$medlightgray',
  },

  createBtnContainer: {
    width: '90%',
    marginBottom: 20,
  },
  createBtn: {
    backgroundColor: '$green',
    borderColor: '$green',
    borderWidth: 3,
  },
  createBtnDisabled: {
    backgroundColor: 'transparent',
  },
  createBtnDisabledTitle: {
    color: '$green',
  },

  nameInput: {
    width: '100%',
    padding: 15,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
});

export default class NewFileModal extends React.Component {
  state = {
    type: null,
    title: null,
  };

  validateFileParameters() {
    const { type, title } = this.state;
    return type != null && type != '' && title != null && title != '';
  }

  render() {
    const { isVisible, dismissModal, onCreate } = this.props;
    const { type, title } = this.state;

    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={dismissModal}
        useNativeDriver
        backdropOpacity={0.4}
        animationInTiming={200}
        animationOutTiming={200}
        avoidKeyboard
        style={styles.modal}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.nameInput}
            onChangeText={text => {
              this.setState({
                title: text,
              });
            }}
            placeholder="Name"
          />

          <View style={styles.fileTypeButtons}>
            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  type: 'folder',
                })
              }
            >
              <View style={[styles.fileTypeButton, type == 'folder' ? styles.selected : null]}>
                <Icon name="folder" type="material-community" size={50} color="gray" />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  type: 'document',
                })
              }
            >
              <View style={[styles.fileTypeButton, type == 'document' ? styles.selected : null]}>
                <Icon name="file-document" type="material-community" size={50} color="#17c0eb" />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  type: 'image',
                })
              }
            >
              <View style={[styles.fileTypeButton, type == 'image' ? styles.selected : null]}>
                <Icon name="file-image" type="material-community" size={50} color="gray" />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Button
              title="Create"
              containerStyle={styles.createBtnContainer}
              buttonStyle={styles.createBtn}
              disabledStyle={styles.createBtnDisabled}
              disabledTitleStyle={styles.createBtnDisabledTitle}
              disabled={!this.validateFileParameters()}
              onPress={() => onCreate(title, type)}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
