import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({
  container: {
    marginRight: 5,
    marginTop: 25,
  },
  countContainer: {
    alignItems: 'flex-end',
  },
  countText: {
    fontSize: 10,
    marginTop: -3,
  },
  heart: {
    color: '$red',
    fontWeight: 'bold',
  },
  redColorFaded: {
    color: '$red',
    opacity: 0.6,
  },
});

@compose(
  withFirestore,
  connect(({ firebase: { auth } }) => ({
    auth,
  }))
)
export default class LikesHeart extends React.Component {
  render() {
    const { currentMessage, onPress, auth } = this.props;
    const likesCount = Object.keys(currentMessage.likes).length;
    const hasLikedMessage = !(currentMessage.likes[auth.uid] == null);
    const onPressAction = hasLikedMessage ? 'dislike' : 'like';
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => onPress(currentMessage, onPressAction)}
          style={{ flex: 1 }}
        >
          <Icon
            name={`heart${likesCount > 0 ? '' : '-o'}`}
            type="font-awesome"
            size={20}
            iconStyle={hasLikedMessage ? styles.heart : styles.redColorFaded}
          />
        </TouchableWithoutFeedback>
        <View style={styles.countContainer}>
          <Text style={[styles.countText, styles.redColorFaded]}>
            {likesCount === 0 ? ' ' : likesCount}
          </Text>
        </View>
      </View>
    );
  }
}
