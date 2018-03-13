import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  sessionDataContainer: {
    alignItems: 'center',
  },
  sessionDataTitle: {
    fontFamily: 'OpenSansBold',
    fontSize: 20,
  },
  submitButton: {
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '$green',
  },
});

export default styles;
