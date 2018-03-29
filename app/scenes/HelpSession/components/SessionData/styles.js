import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sessionDataContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  alertSessionDataContainer: {
    backgroundColor: '$orange',
  },
  sessionWaitingContainer: {
    justifyContent: 'center',
  },
  sessionWaitingText: {
    color: 'gray',
    paddingVertical: 5,
    textAlign: 'center',
  },
  alertText: {
    color: 'white',
  },
  activityIndicatorContainer: {
    paddingVertical: 10,
  },
  sessionLengthText: {
    color: '$offBlack',
    fontSize: 40,
  },
  sessionCostText: {
    color: '$offBlack',
    textAlign: 'center',
    fontSize: 25,
  },
});

export default styles;
