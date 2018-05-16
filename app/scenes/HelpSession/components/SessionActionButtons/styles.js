import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    width: "100%"
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  sideBySideButton: {
    width: 150,
    height: 45,
    marginBottom: 10,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  endButton: {
    height: 45,
    backgroundColor: "$green",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    width: "$screenWidth - 50",
    marginBottom: 10
  },
  acceptButton: {
    backgroundColor: "$green"
  },
  denyButton: {
    backgroundColor: "$red"
  },
  cancelButton: {
    backgroundColor: "$orange"
  }
});

export default styles;
