import React from 'react';
import Meteor from 'react-native-meteor';
import { View, Text } from 'react-native';
import { Rating, Button } from 'react-native-elements';

import TextBox from 'app/components/TextBox/index';
import { GetOtherUsersNameForSession, GetOtherUsersIdForSession } from '../../helpers';
import { RateUser } from 'app/Helpers/Meteor';

import styles from './styles';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      message: '',
    };
    // bind
    this.onPress = this.onPress.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate('Show', params);
  }

  updateMessage(value) {
    this.setState({
      message: value,
    });
  }

  updateRating(value) {
    this.setState({
      rating: value,
    });
  }

  render() {
    const { timeAndCost } = this.props;
    const { session } = this.props;
    const otherUsersName = GetOtherUsersNameForSession(session, Meteor.userId());
    return (
      <View style={styles.container}>
        <View style={styles.sessionDataContainer}>
          <Text style={styles.sessionDataTitle}> Give {otherUsersName} some feedback! </Text>
          <Text> ${timeAndCost.cost} + 5% fee </Text>
        </View>

        <View style={styles.ratingContainer}>
          <Rating
            imageSize={40}
            startingValue={this.state.rating}
            fractions={1}
            onFinishRating={this.updateRating}
          />
        </View>
        <View>
          <TextBox updateInitialMessageText={this.updateMessage} />
        </View>

        <Button
          title="Submit"
          textStyle={{ fontWeight: '700' }}
          buttonStyle={styles.submitButton}
          containerStyle={{ marginTop: 20 }}
          onPress={() =>
            RateUser(
              Meteor.userId(),
              GetOtherUsersIdForSession(session),
              session.courseId,
              session._id,
              this.state.rating,
              this.state.message,
            )
          }
        />
      </View>
    );
  }
}
