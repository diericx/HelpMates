import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '$lightblue',
    marginLeft: -8
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '$lightblue',
  },
  icon: {
    color: '$lightblue'
  }
});

export default styles;