import React from 'react';

import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  sepperator: {
    width: '85%',
    alignSelf: 'flex-end',
    height: 0.5,
    backgroundColor: 'lightgray',
  },
});

const Sepperator = props => {
  const { renderTop, renderBottom, children } = props;

  const shouldRenderTop = renderTop != null ? renderTop : true;
  const shouldRenderBottom = renderBottom != null ? renderBottom : true;
  return (
    <View style={styles.container}>
      {shouldRenderTop ? <View style={styles.sepperator} /> : null}
      {children}
      {shouldRenderBottom ? <View style={styles.sepperator} /> : null}
    </View>
  );
};

export default Sepperator;
