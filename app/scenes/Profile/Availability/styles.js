import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor"
  },
  title: {
    fontSize: 25
  },
  availabilitiesListContainer: {
    width: "$screenWidth",
    height: 150
  }
});

export default styles;
