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
  heart: {
    color: '$red',
  },
});

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  // Callback for long press on message
  onLongPress() {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context);
    } else if (this.props.currentMessage.text) {
      const options = ['Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      this.context
        .actionSheet()
        .showActionSheetWithOptions({ options, cancelButtonIndex }, buttonIndex => {
          if (buttonIndex === 0) {
            Clipboard.setString(this.props.currentMessage.text);
          }
        });
    }
  }

  renderUsername() {
    const username = this.props.currentMessage.user.name;
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = this.props;
      if (this.props.renderUsername) {
        return this.props.renderUsername(usernameProps);
      }
      return (
        <Text
          style={[
            styles.standardFont,
            styles.headerItem,
            styles.username,
            this.props.usernameStyle,
          ]}
        >
          {username}
        </Text>
      );
    }
    return null;
  }

  render() {
    const { currentMessage, previousMessage, touchableProps, wrapperStyle } = this.props;
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

        <View>
          <Icon
            name="heart"
            type="font-awesome"
            size={20}
            containerStyle={styles.heartContainer}
            iconStyle={styles.heart}
          />
        </View>
      </View>
    );
  }
}
