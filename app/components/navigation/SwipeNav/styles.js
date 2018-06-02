import EStyleSheet from 'react-native-extended-stylesheet';
import { Constants } from 'expo';

const styles = EStyleSheet.create({
  statusBar: {
    backgroundColor: "$lightblue",
    height: Constants.statusBarHeight,
  },

  swipeNavContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  navBarContent: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  navBarTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    zIndex: 99,
  },
  navBarTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white"
  }
});

export default styles;