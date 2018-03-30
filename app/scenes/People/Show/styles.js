import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  agenda: {
    flex: 1,
    width: '100%',
  },
  buttonGroupContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonGroup: {
    width: '80%',
    height: 30,
    marginTop: 10,
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

export default styles;
