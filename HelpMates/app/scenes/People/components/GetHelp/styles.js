import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  agenda: {
    flex: 1,
    width: '100%',
  },
  cardContainer: {
    flex: 1,
    marginBottom: 10,
  },
  cardScrollView: {
    height: '100%',
  },
  card: {
    height: '100%',
    marginTop: 0,
    backgroundColor: 'white',
  },
  agendaCard: {
    padding: 0,
  },
  agendaCardWrapper: {
    flex: 1,
    padding: 0,
  },
  sendRequestButton: {
    height: 45,
    backgroundColor: '$green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
  },
});
