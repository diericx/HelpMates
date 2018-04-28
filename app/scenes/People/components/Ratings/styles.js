import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flexDirection: "row",
    paddingBottom: 15
  },
  headerRightContainer: {
    marginLeft: 20,
    justifyContent: "center"
  },
  nameText: {
    fontSize: 16,
    marginLeft: 2,
    color: "$darkgray"
  },
  ratingMessageContainer: {
    marginTop: 10
  }
});

export default styles;
