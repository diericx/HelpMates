import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 100
  },
  itemTimes: {
    // flex: 1,
    justifyContent: "space-between",
    flexDirection: "column"
  },
  itemNote: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

export default styles;
