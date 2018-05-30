import React from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { Avatar, Rating } from "react-native-elements";
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from "@expo/vector-icons/FontAwesome";

import styles from './styles';

let ANIMATION_DURATION = 75;

class UserCard extends React.Component {
  state = {
    shadowRadius: new Animated.Value(5),
    scale: new Animated.Value(1),
  }

  onPressIn() {
    Animated.timing(                  
      this.state.scale,            
      {
        toValue: 0.95,                  
        duration: ANIMATION_DURATION,             
      }
    ).start(); 

    Animated.timing(                 
      this.state.shadowRadius,            
      {
        toValue: 0,                   
        duration: ANIMATION_DURATION,   
      }           
    ).start(); 
  }

  onPressOut() {
    Animated.timing(                  
      this.state.scale,            
      {
        toValue: 1,                   
        duration: ANIMATION_DURATION,              
      }
    ).start(); 

    Animated.timing(                 
      this.state.shadowRadius,            
      {
        toValue: 5,                   
        duration: ANIMATION_DURATION,   
      }           
    ).start(); 
  }

  animateCardToFill() {

  }

  animateCardToNormal() {

  }

  render() {
    let { user } = this.props;
    let { scale } = this.state;
  
    return (
      <TouchableWithoutFeedback onPressIn={this.onPressIn.bind(this)} onPressOut={this.onPressOut.bind(this)}>
        <Animated.View style={[styles.container, {shadowRadius: this.state.shadowRadius}, {transform: [{scale: this.state.scale}] }]}>
          <View style={styles.topContainer}>
            <View style={styles.avatarContainer}>
              <Avatar
                size="large"
                rounded
                source={{uri: user.avatar}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
            </View>

            <View>
              <Text style={styles.nameText}> {user.fullName} </Text>
              <Rating
                type="star"
                fractions={1}
                startingValue={3.6}
                readonly
                imageSize={25}
                onFinishRating={this.ratingCompleted}
                style={{ paddingLeft: 4 }}
              />
            </View>
          </View>

          <View style={styles.middleContainer}>
            <Text style={styles.bioText}>{"\t"}{user.bio} </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

// "envelope-o"
export default UserCard;
