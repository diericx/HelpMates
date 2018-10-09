import React from 'react';

import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native-expo-image-cache';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {},
  iconCircle: {
    borderWidth: 10,
    borderColor: 'white',
    justifyContent: 'center',
  },
});

const CachedAvatar = props => {
  const { containerStyle, uri, size, preview, rounded, onPress } = props;

  // Create style objects for options specified in props (eg. rounded or size)
  const sizeStyle = { width: size == null ? 100 : size, height: size == null ? 100 : size };
  const roundedStyle = rounded ? { borderRadius: size / 2 } : null;

  return (
    <TouchableOpacity style={[roundedStyle, containerStyle]} onPress={onPress}>
      {!uri ? (
        <View style={[roundedStyle, sizeStyle, styles.iconCircle]}>
          <Icon type="font-awesome" name="image" size={150} color="white" />
        </View>
      ) : (
        <Image
          style={[roundedStyle, sizeStyle]}
          {...{ preview: preview ? { uri: preview } : null, uri }}
        />
      )}
    </TouchableOpacity>
  );
};

CachedAvatar.propTypes = {
  uri: PropTypes.string,
  size: PropTypes.number.isRequired,

  preview: PropTypes.string,
  rounded: PropTypes.bool,
  onPress: PropTypes.func,
};

CachedAvatar.defaultProps = {
  uri: null,
  preview: null,
  rounded: false,
  onPress: null,
};

export default CachedAvatar;
