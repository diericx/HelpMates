import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '70%',
    height: 130,
  },
  profileImageContainer: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  profileDataContainer: {
    justifyContent: 'center',
    marginLeft: 30,
  },
  nameText: {
    marginVertical: -2,
    fontSize: 25,
  },
  subtitleText: {
    marginVertical: 3,
    fontSize: 13,
    opacity: 0.5,
  },
  detailsText: {
    marginVertical: 3,
    fontSize: 16,
    opacity: 0.7,
  },
});

export default styles;
