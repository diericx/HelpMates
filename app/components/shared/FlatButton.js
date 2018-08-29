import React from 'react';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const FlatButton = props => {
  const { style, title, loading, containerStyle, enabled, onPress } = props;

  const styles = EStyleSheet.create({
    container: {
      width: '90%',
      ...containerStyle,
    },
    button: {
      width: '100%',
      backgroundColor: '$lightblue',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 5,
      marginBottom: 15,
      ...style,
    },
  });

  return (
    <Button
      title={title}
      loading={loading}
      titleStyle={{ fontWeight: '700' }}
      buttonStyle={styles.button}
      containerStyle={styles.container}
      onPress={onPress}
      enabled={enabled}
    />
  );
};

export default FlatButton;
