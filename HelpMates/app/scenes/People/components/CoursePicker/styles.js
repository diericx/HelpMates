import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  noneMessageText: {
    color: "gray",
    padding: 10,
    textAlign: "center"
  },
  listItemContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#d6d7da"
  }
});

export default styles;
