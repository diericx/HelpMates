import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  searchContainer: {
    backgroundColor: '$bgColor',
  },
  searchInput: {
    backgroundColor: '$lightgray',
  },
  cardContainer: {
    margin: 0,
    marginTop: -2,
    padding: 0,
  },
  cardTitleContainer: {
    paddingVertical: 5,
    paddingLeft: 5,
    backgroundColor: '$lightgray',
  },
  cardTitleContainerHighlighted: {
    paddingVertical: 2,
    backgroundColor: '$greenTrans',
    alignItems: 'center',
  },
  cardTitleHighlighted: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

export default styles;
