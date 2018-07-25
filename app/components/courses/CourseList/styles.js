import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '$green',
    marginLeft: -8
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '$green',
  },
  icon: {
    color: '$green'
  },
  itemTopBorder: {
    borderTopWidth: 0.5,
    borderColor: 'lightgray'
  },
  itemBottomBorder: {
    borderBottomWidth: 0.5,
    borderColor: 'lightgray'
  }
});

export default styles;