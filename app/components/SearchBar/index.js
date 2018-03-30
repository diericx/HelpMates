import React from 'react';
import { SearchBar } from 'react-native-elements';

import styles from './styles';

export default function ActivityIndicator(props) {
  const placeholderColor = 'rgba(255, 255, 255, 0.7)';
  return (
    <SearchBar
      containerStyle={{
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
      }}
      inputStyle={{
        backgroundColor: '#17c0eb',
        borderRadius: 8,
        height: 35,
        width: 330,
        color: 'white',
      }}
      placeholderTextColor={placeholderColor}
      icon={{
        type: 'font-awesome',
        name: 'search',
        style: [{ color: placeholderColor }, styles.icon],
      }}
      onChangeText={text => props.onChangeText(text)}
      placeholder={props.placeholder}
    />
  );
}
