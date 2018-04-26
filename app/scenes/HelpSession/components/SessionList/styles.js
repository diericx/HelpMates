import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  listItemContainer: {
    marginTop: -1,
    borderTopColor: "#e1e8ee",
    borderTopWidth: 1,
    borderBottomWidth: 0
  },
  listItemHighlightedContainer: {
    backgroundColor: "$lightblueTrans"
  },
  ratingContainer: {
    flexDirection: "row",
    marginLeft: 9
  },
  listSubTitleLarge: {
    fontSize: 15
  }
});
