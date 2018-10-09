/* eslint-disable no-underscore-dangle, no-use-before-define */
import React from 'react';
import { View, ActionSheetIOS } from 'react-native';
import { Day, utils } from 'react-native-gifted-chat';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { validate } from '../../../lib/Utils';

import CachedAvatar from '../CachedAvatar';
import Bubble from './Bubble';

const { isSameUser, isSameDay } = utils;
const AVATAR_SIZE = 40;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 0,
  },
  avatar: {
    marginRight: 10,
    // paddingTop: 5,
  },
  heartContainer: {
    paddingRight: 15,
  },
  heart: {
    color: '$red',
  },
  // heartIconContainer: {
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

@connect(({ firebase: { profile, auth } }) => ({
  profile,
  auth,
}))
export default class Message extends React.Component {
  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props;
    return {
      ...props,
      position: 'left',
      isSameUser,
      isSameDay,
    };
  }

  showUserProfileActionSheet = userId => {
    validate('Message.showUserProfileActionSheet()', userId);
    const { blockUser, auth } = this.props;
    // Don't let people block themselves!
    if (auth.uid === userId) {
      return null;
    }
    const options = ['Block User', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    ActionSheetIOS.showActionSheetWithOptions({ options, cancelButtonIndex }, buttonIndex => {
      if (options[buttonIndex] === 'Block User') {
        blockUser(userId);
      }
    });
  };

  renderDay() {
    const { currentMessage, renderDay } = this.props;
    if (currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      if (renderDay) {
        return renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  }

  renderBubble() {
    const { reportMessage, likeMessage, renderBubble, auth } = this.props;
    const bubbleProps = this.getInnerComponentProps();
    // Check if a custom render method was provided
    if (renderBubble) {
      return renderBubble(bubbleProps);
    }
    // Default to bubble for rendering
    return <Bubble {...bubbleProps} {...{ reportMessage, likeMessage, auth }} />;
  }

  renderAvatar() {
    const { currentMessage, previousMessage } = this.props;

    if (isSameUser(currentMessage, previousMessage) && isSameDay(currentMessage, previousMessage)) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      return <View style={[{ width: AVATAR_SIZE, height: AVATAR_SIZE }, styles.avatar]} />;
    }

    return (
      <CachedAvatar
        uri={currentMessage.user.avatar.uri}
        preview={currentMessage.user.avatar.preview}
        size={AVATAR_SIZE}
        containerStyle={styles.avatar}
        onPress={() => this.showUserProfileActionSheet(currentMessage.user._id)}
        rounded
      />
    );
  }

  render() {
    const { currentMessage, nextMessage, profile } = this.props;

    const marginBottom = isSameUser(currentMessage, nextMessage) ? 2 : 10;
    // If the user who sent this message is blocked, don't display it
    if (profile.blockedUsers && profile.blockedUsers[currentMessage.user._id]) {
      return null;
    }
    return (
      <View>
        {this.renderDay()}
        <View style={[styles.container, { marginBottom }]}>
          {this.renderAvatar()}
          {this.renderBubble()}
        </View>
      </View>
    );
  }
}
