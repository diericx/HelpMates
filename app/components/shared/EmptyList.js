import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
  },
  centered: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '$gray',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});

/**
 * A view that's rendered when a list is empty. Displays text first, then any
 * children that are passed in.
 */
const EmptyList = ({ text, centered, children }) => (
  <View style={[styles.container, centered ? styles.centered : null]}>
    <Text style={styles.text}>{text}</Text>
    {children}
  </View>
);
export default EmptyList;
