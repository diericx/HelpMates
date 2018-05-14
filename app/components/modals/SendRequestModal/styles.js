import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  modalContainer: {
    height: 300,
    width: "100%",
    marginBottom: 300,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)"
  },
  dataContainer: {
    flex: 1,
    alignItems: "center"
  },
  dataContainerTitle: {
    fontSize: 23,
    marginTop: 30
  },
  dataContainerText: {
    marginTop: 20
  },
  sendButtonContainer: {
    height: 60,
    // width: "90%",
    // marginBottom: 20,
    backgroundColor: "$green"
  },
  sendButtonText: {
    fontSize: 23,
    color: "rgba(255, 255, 255, 1)"
  },
  dateRangeContainer: {
    flex: 0,
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  }
});

export default styles;
