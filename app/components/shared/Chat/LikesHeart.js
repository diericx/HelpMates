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
  constructor() {
    super();
    // bind
    this.likeMessage = this.likeMessage.bind(this);
  }

  likeMessage(message, action) {
    const { firestore, auth, groupId } = this.props;
    let deltaLikes = null;

    // decide what to change
    if (action === 'like') {
      deltaLikes = {
        [`likes.${auth.uid}`]: 1,
      };
    } else if (action === 'dislike') {
      deltaLikes = {
        [`likes.${auth.uid}`]: firestore.FieldValue.delete(),
      };
    }
    // send update
    firestore.update(`groups/${groupId}/messages/${message._id}`, deltaLikes);
  }

  render() {
    const { currentMessage, auth } = this.props;
    const likesCount = Object.keys(currentMessage.likes).length;
    const hasLikedMessage = !(currentMessage.likes[auth.uid] == null);
    const onPressAction = hasLikedMessage ? 'dislike' : 'like';
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.likeMessage(currentMessage, onPressAction)}
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
