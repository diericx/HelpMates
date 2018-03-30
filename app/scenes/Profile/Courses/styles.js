import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  rateContainer: {
    marginTop: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseCardContainer: {
    width: '100%',
  },
  title: {
    fontSize: 25,
  },
  availabilitiesListContainer: {
    width: '$screenWidth',
    height: 10,
  },
  removeCourseButton: {
    height: 45,
    backgroundColor: '$red',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
