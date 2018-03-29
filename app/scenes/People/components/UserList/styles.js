import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  sectionHeaderContainer: {
    marginTop: -1,
    height: 28,
    justifyContent: 'center',
    backgroundColor: '$lightgray',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#d1d1d1',
  },
  sectionHeaderText: {
    fontSize: 14,
    marginLeft: 4,
  },
  listItemContainer: {
    marginTop: -1,
    borderTopColor: '#e1e8ee',
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  listFooter: {
    height: 4,
    backgroundColor: '$lightgray',
  },
  ratingContainer: {
    flexDirection: 'column',
    // marginLeft: 9,
  },
  subtitleRating: {
    marginLeft: 9,
  },
});
