import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MessageText as RNGCMessageText } from 'react-native-gifted-chat';

const styles = EStyleSheet.create({
  text: {
    marginLeft: 0,
    paddingLeft: 0,
  },
});

export default function MessageText(props) {
  const {
    currentMessage: { text },
    renderMessageText,
  } = props;

  if (text) {
    const { messageTextStyle, ...messageTextProps } = props;
    if (renderMessageText) {
      return renderMessageText(messageTextProps);
    }
    return (
      <RNGCMessageText
        {...messageTextProps}
        textStyle={{
          left: [messageTextStyle, messageTextProps.textStyle, styles.text],
        }}
      />
    );
  }
  return null;
}
