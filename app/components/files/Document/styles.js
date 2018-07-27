import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    paddingTop: 10,
  },
  entryContainer: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  entryTitle: {
    fontFamily: 'Avenir-Black',
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 25,
    color: '#0f0f0f',
    marginBottom: 5,
  },
  entryBody: {
    fontFamily: 'Avenir-Light',
    lineHeight: 25,
    color: '#101010',
    fontSize: 17,
  },
  messageText: {
    fontFamily: 'Avenir-LightOblique',
    fontSize: 10,
    lineHeight: 12,
    color: 'lightgray',
  }
});

export default styles;