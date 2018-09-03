import React from 'react';
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';
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
    const { onLongPress, currentMessage } = this.props;

    if (onLongPress) {
      onLongPress(this.context);
    } else if (currentMessage.text) {
      const options = ['Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      this.context
        .actionSheet()
        .showActionSheetWithOptions({ options, cancelButtonIndex }, buttonIndex => {
          if (buttonIndex === 0) {
            Clipboard.setString(currentMessage.text);
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
    const { currentMessage, previousMessage, touchableProps, wrapperStyle, profile } = this.props;
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

        <LikesHeart profile={profile} {...this.props} />
      </View>
    );
  }
}
