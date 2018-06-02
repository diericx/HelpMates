import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: "center"
  },
  selector: {
    width: "80%",
    height: 4,
    backgroundColor: "white",
    borderRadius: 5,
  }
});

export default styles; 