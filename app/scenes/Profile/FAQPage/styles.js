import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chat: {
    flex: 1,
  },
  sessionDataContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sessionData: {},
  sessionDataText: {
    color: 'gray',
    paddingVertical: 5,
  },
  centerText: {
    textAlign: 'center',
  },
});

export default styles;