import React from 'react';
import { Platform, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MessageText as RNGCMessageText } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';

const styles = EStyleSheet.create({
  text: {
    marginLeft: 0,
    paddingLeft: 0,
  },
});

export default function MessageText(props) {
  const {
    currentMessage: { text, deleted },
    renderMessageText,
  } = props;

  let messageTextStyleAdjustment;

  // Make "pure emoji" messages much bigger than plain text.
  if (text && emojiUtils.isPureEmojiString(text) && !deleted) {
    messageTextStyleAdjustment = {
      fontSize: 30,
      // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
      lineHeight: Platform.OS === 'android' ? 34 : 30,
    };
  }

  if (text) {
    const { ...messageTextProps } = props;
    if (messageTextProps.currentMessage.deleted) {
      messageTextProps.currentMessage.text = 'Deleted';
    }

    if (renderMessageText) {
      return renderMessageText(messageTextProps);
    }
    return (
      <RNGCMessageText
        {...messageTextProps}
        textStyle={{
          left: [messageTextStyleAdjustment, messageTextProps.textStyle, styles.text],
        }}
      />
    );
  }
  return null;
}
