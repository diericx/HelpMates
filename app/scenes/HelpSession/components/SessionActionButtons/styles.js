import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  sideBySideButton: {
    width: 150,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  endButton: {
    height: 45,
    backgroundColor: '$green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    width: '$screenWidth - 50',
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: '$green',
  },
  denyButton: {
    backgroundColor: '$red',
  },
  cancelButton: {
    backgroundColor: '$orange',
  },
});

export default styles;
