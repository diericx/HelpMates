import React from 'react';

import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Image } from "react-native-expo-image-cache";

import styles from './styles';

export default class CachedAvatar extends React.Component {

  render() {
    const { uri, size, preview, rounded, onPress } = this.props

    // Create style objects for options specified in props (eg. rounded or size)
    const sizeStyle = {width: size == null ? 100 : size, height: size == null ? 100 : size};
    const roundedStyle = rounded ? {borderRadius: size/2} : null;

    return (
      <TouchableOpacity 
        style={roundedStyle}
        onPress={onPress}
      >
        {uri == null ? 
          <View style={[roundedStyle, sizeStyle, styles.iconCircle]}>
            <Icon type='font-awesome' name='image' size={150} color={'white'} />
          </View>
        :
          <Image
            style={[roundedStyle, sizeStyle]}
            {...{preview, uri}}
          />
        }
        
      </TouchableOpacity>
    );
  }
}
