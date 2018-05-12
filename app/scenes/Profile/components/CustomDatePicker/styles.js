import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    marginTop: 10
  },
  labelContainer: {},
  timePickersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    paddingBottom: 3
  },
  button: {
    backgroundColor: "$lightgray"
  },
  selectedButton: {
    backgroundColor: "white"
  },
  labelText: {
    color: "lightgray"
  }
});

export default styles;
