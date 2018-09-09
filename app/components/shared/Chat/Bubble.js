import React from 'react';
import { Text, Clipboard, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MessageImage, Time, utils } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';

import Username from './Username';
import MessageText from './MessageText';
import LikesHeart from './LikesHeart';

const { isSameUser, isSameDay } = utils;

const styles = EStyleSheet.create({
  standardFont: {
    paddingLeft: 0,
    marginLeft: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  // Callback for long press on message
  onLongPress() {
    const { onLongPress, currentMessage, reportMessage } = this.props;

    if (onLongPress) {
      onLongPress(this.context);
    } else if (currentMessage.text) {
      const options = ['Copy Text', 'Report Message', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      this.context
        .actionSheet()
        .showActionSheetWithOptions({ options, cancelButtonIndex }, buttonIndex => {
          if (buttonIndex === 0) {
            // Copy Text
            Clipboard.setString(currentMessage.text);
          } else if (buttonIndex === 1) {
            // Report
            reportMessage(currentMessage);
          }
        });
    }
  }

  renderUsername() {
    const { currentMessage, renderUsername, usernameStyle } = this.props;
    const username = currentMessage.user.name;
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = this.props;
      if (renderUsername) {
        return renderUsername(usernameProps);
      }
      return (
        <Text style={[styles.standardFont, styles.headerItem, styles.username, usernameStyle]}>
          {username}
        </Text>
      );
    }
    return null;
  }

  render() {
    const {
      currentMessage,
      previousMessage,
      touchableProps,
      wrapperStyle,
      likeMessage,
    } = this.props;
    const isSameThread =
      isSameUser(currentMessage, previousMessage) && isSameDay(currentMessage, previousMessage);
    const messageHeader = isSameThread ? null : <View style={styles.headerView} />;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onLongPress={this.onLongPress}
            accessibilityTraits="text"
            {...touchableProps}
          >
            <View style={[styles.wrapper, wrapperStyle]}>
              <View>
                {<Username {...this.props} />}
                {<MessageText {...this.props} />}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {currentMessage.likes == null ? null : (
          <LikesHeart currentMessage={currentMessage} onPress={likeMessage} />
        )}
      </View>
    );
  }
}

Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};
