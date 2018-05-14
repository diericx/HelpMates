import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor",
    paddingTop: 30
    // justifyContent: "center"
  },
  ratingContainer: {
    alignItems: "center"
  },
  sessionDataContainer: {
    alignItems: "center"
  },
  submitButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },
  textInputContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderColor: "lightgray",
    height: 65,
    borderWidth: 1,
    borderRadius: 5
  },
  sessionDataTitle: {
    fontSize: 20,
    paddingBottom: 20
  },
  submitButton: {
    height: 45,
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: "$green"
  }
});

export default styles;
