import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor",
    paddingTop: 15,
    justifyContent: "space-between"
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center"
  }
});

export default styles;
