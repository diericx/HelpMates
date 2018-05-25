import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating
        size={props.size}
        {...props}
      />
    </View>
  );
};

export default Loading;
