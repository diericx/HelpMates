import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor"
  },
  profilePicContainer: {
    marginTop: 20,
    marginBottom: 10
  },
  listItem: {
    borderBottomWidth: 0
  },
  title: {
    color: "gray"
  },
  list: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 0
  },
  header: {
    fontWeight: "bold",
    margin: 10,
    marginTop: 18,
    color: "gray"
  },
  divider: {
    backgroundColor: "lightgray"
  }
});

export default styles;
