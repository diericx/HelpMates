import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor"
  },
  headerTitleContainer: {
    flexDirection: "row"
  },
  headerTitleIcon: {
    marginLeft: 10,
    marginRight: -10,
    paddingRight: 0,
    marginTop: 3
  },
  chat: {
    flex: 1
  }
});

export default styles;
