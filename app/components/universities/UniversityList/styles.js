import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "$turquoise",
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  universityContainer: {
    paddingHorizontal: 20
  },
  university: {
    borderRadius: 2,
    marginVertical: 15
  }
});

export default styles;