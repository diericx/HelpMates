import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  buttonTitle: {
    color: '$lightblue',
    marginLeft: -8
  },
  button: {
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'transparent',
  },
  icon: {
    paddingLeft: 5
  }
});

export default styles;