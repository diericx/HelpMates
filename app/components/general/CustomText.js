import React from 'react';
import { Text } from 'react-native';

export function CText(props) {
  return <Text style={[{ fontFamily: 'OpenSans' }, props.style]}>{props.children}</Text>;
}

export function CTextBold(props) {
  return <Text style={[{ fontFamily: 'OpenSansBold' }, props.style]}>{props.children}</Text>;
}
