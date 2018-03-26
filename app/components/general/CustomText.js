import React from 'react';
import { Text } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  normal: {
    fontFamily: 'OpenSans',
  },
  bold: {
    fontFamily: 'OpenSansBold',
  },
  listSubtitle: {
    marginLeft: 10,
    color: '$gray',
  },
});

export default styles;

export function CText(props) {
  return <Text style={[styles.normal, props.style]}>{props.children}</Text>;
}

export function CTextBold(props) {
  return <Text style={[styles.bold, props.style]}>{props.children}</Text>;
}

export function CTextSubtitle(props) {
  return <Text style={[styles.normal, styles.listSubtitle, props.style]}>{props.children}</Text>;
}
