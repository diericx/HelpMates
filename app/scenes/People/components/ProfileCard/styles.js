import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
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
    marginVertical: -3,
    fontSize: 25,
  },
  subtitleText: {
    fontSize: 13,
    opacity: 0.5,
  },
});

export default styles;
