/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types';
import React from 'react';
import { View, ViewPropTypes, StyleSheet, Text } from 'react-native';
import { Day, utils } from 'react-native-gifted-chat';
import EStyleSheet from 'react-native-extended-stylesheet';

import CachedAvatar from '../CachedAvatar';
import Bubble from './SlackBubble';

const { isSameUser, isSameDay } = utils;
const AVATAR_SIZE = 40;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 0,
  },
  avatar: {
    marginRight: 10,
  },
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
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <Bubble {...bubbleProps} />;
  }

  renderAvatar() {
    const { currentMessage, previousMessage } = this.props;

    if (isSameUser(currentMessage, previousMessage) && isSameDay(currentMessage, previousMessage)) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      // console.log('Same user same dat', this.props.currentMessage);
      // return null;
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
    const marginBottom = isSameUser(this.props.currentMessage, this.props.nextMessage) ? 2 : 10;

    return (
      <View>
        {this.renderDay()}
        <View style={[styles.container, { marginBottom }, this.props.containerStyle]}>
          {this.renderAvatar()}
          {this.renderBubble()}
        </View>
      </View>
    );
  }
}

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
};

Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};
