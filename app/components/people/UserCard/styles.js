import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  // Main Container
  container: {
    width: "95%",
    marginBottom: 15,
    padding: 12,
    backgroundColor: "white",
    // border
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: "lightgray",
    // Shadow
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },

  // Sections
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  middleContainer: {

  },

  // Other Containers
  avatarContainer: {
    paddingRight: 10,
  },

  // General
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.9,
  },
  bioText: {
    fontSize: 17,
    opacity: 0.85,
  }
});

export default styles;