import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  listItem: {
    borderBottomWidth: 0,
  },
  list: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: 'bold',
  }
});

export default styles;
