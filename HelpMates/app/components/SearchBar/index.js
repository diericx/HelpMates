import React from "react";
import { SearchBar } from "react-native-elements";

import styles from "./styles";

export default function ActivityIndicator(props) {
  const placeholderColor = "rgba(255, 255, 255, 0.7)";
  return (
    <SearchBar
      containerStyle={{
        flexDirection: "row",
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        ...props.containerStyle
      }}
      inputContainerStyle={{
        backgroundColor: "#17c0eb",
        borderRadius: 8
      }}
      inputStyle={{
        height: 35,
        flex: 1,
        color: "white",
        ...props.inputStyle
      }}
      placeholderTextColor={placeholderColor}
      searchIcon={{
        type: "font-awesome",
        name: "search",
        color: placeholderColor,
        size: 15,
        containerStyle: styles.icon
      }}
      onChangeText={text => props.onChangeText(text)}
      placeholder={props.placeholder}
    />
  );
}
