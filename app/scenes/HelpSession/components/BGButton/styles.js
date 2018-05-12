import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "$lightgray"
    // borderBottomColor: "$lightblueDown"
  },
  text: {
    fontSize: 15,
    color: "$darkgray"
  }
});

export default styles;
