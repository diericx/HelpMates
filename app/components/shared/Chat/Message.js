/* eslint-disable no-underscore-dangle, no-use-before-define */
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Day, utils } from 'react-native-gifted-chat';
import EStyleSheet from 'react-native-extended-stylesheet';

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
        rounded
      />
    );
  }

  render() {
    const { currentMessage, nextMessage } = this.props;

    const marginBottom = isSameUser(currentMessage, nextMessage) ? 2 : 10;

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
