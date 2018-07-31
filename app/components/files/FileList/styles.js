import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerText: {
    color: 'gray'
  },
  header: {
    justifyContent: 'center',
    // backgroundColor: '$lightgray',
    height: 45,
    paddingLeft: 15
  },
  subtitle: {
    color: 'gray',
    paddingVertical: 3,
    fontSize: 12
  }
});

export default styles;