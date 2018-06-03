import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1
    // width: "100%",
    // height: "100%",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 3,
    // backgroundColor: "red"
  },
  searchContentcontainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20
  },
  placeholderText: {
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 4,
    fontWeight: "bold",
    color: "white"
  },  
  searchInput: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingLeft: 8
  },

  group: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "gray",
    borderBottomWidth: 0.5,
    // width: "85%",
  },
  firstGroup: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  lastGroup: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  groupTitle: {
    color: "white",
    fontWeight: "bold"
  },
  groupSubtitle: {
    color: "lightgray"
  }
});

export default styles;