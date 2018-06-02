import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

const Loading = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.tabs.map((tab, index) => {
        return (
          <TouchableWithoutFeedback key={index} onPress={() => props.onPress(index)}>
            <View style={styles.tabButton}>
              <Text style={styles.tabText}> {tab} </Text>
              {index == props.selectedIndex ? 
                <View style={styles.selector} />
              :
                null
              }
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  );
};

export default Loading;
