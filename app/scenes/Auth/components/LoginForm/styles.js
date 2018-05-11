import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    width: "$screenWidth"
  },
  input: {
    color: "white",
    // backgroundColor: "rgba(230,230,230,0.8)",borderRadius: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgb(220,220,220)",
    height: 45,
    marginBottom: 18,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#32ff7e",
    paddingVertical: 15
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center"
  }
});

export default styles;
