import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  headerRightContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    marginLeft: 2,
  },
  ratingMessageContainer: {
    marginTop: 10,
  },
});

export default styles;
