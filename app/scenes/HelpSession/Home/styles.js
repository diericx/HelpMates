import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor"
  },
  cardTitleContainer: {
    paddingVertical: 5,
    paddingLeft: 5,
    backgroundColor: "$lightgray"
  },
  buttonGroupContainer: {
    alignItems: "center",
    marginBottom: 5
  },
  buttonGroup: {
    width: "80%",
    height: 30,
    marginTop: 10
  },
  selectedButton: {
    backgroundColor: "$lightgray"
  },
  divider: {
    backgroundColor: "lightgray"
  }
});

export default styles;
