import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    width: "$screenWidth",
    alignItems: "center"
  },
  inputContainer: {
    // color: "rgba(0,0,0, 0.2)",
    // backgroundColor: "rgba(230,230,230,0.8)",borderRadius: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255, 0.6)",
    height: 45,
    marginBottom: 18,
    paddingHorizontal: 10
  },
  input: {
    color: "white"
  },
  label: {
    fontSize: 15,
    textAlign: "center",
    color: "rgba(255,255,255, 0.6)"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255, 0.6)",
    paddingVertical: 15,
    marginBottom: 15,
    width: "90%"
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center"
  }
});

export default styles;
