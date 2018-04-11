import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$bgColor"
  },
  plusIconContainer: {
    flex: 1,
    paddingRight: 10,
    marginRight: 100
  },
  rateContainer: {
    marginTop: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  courseCardContainer: {
    width: "100%"
  },
  title: {
    fontSize: 25
  },
  availabilitiesListContainer: {
    width: "$screenWidth",
    height: 10
  },
  removeCourseButton: {
    height: 45,
    backgroundColor: "$red",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10
  },
  listItemContainer: {
    marginTop: -1,
    borderTopColor: "#e1e8ee",
    borderTopWidth: 1,
    borderBottomWidth: 0
  }
});

export default styles;
