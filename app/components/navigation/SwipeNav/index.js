import React from 'react';
import { Image, View, Text, Animated } from 'react-native';
import { Avatar } from "react-native-elements";
import Swiper from 'react-native-swiper';

// Main App Screens
import Courses from '../../../screens/Courses';
import People from '../../../screens/People';
import Messages from '../../../screens/Messages';

// Helper Shit
import SwipePagination from "../SwipePagination";
import NavBar from "../NavBar";
import FadingTransitionView from "../../FadingTransitionView";

import styles from "./styles"

const xOffset = new Animated.Value(0);
const onScroll = Animated.event(
  [
    { nativeEvent: { contentOffset: { x: xOffset } } }
  ]
);

export default class SwipeNav extends React.Component {
  state = {
    pageIndex: 0,
  }

  render(){
    return (
      <View style={styles.swipeNavContainer}>
        <View style={styles.statusBar} />
        <NavBar defaultBackground>

          <FadingTransitionView index={0} xOffset={xOffset} style={styles.navBarContent}>
            <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> Courses </Text>
            </View>
          </FadingTransitionView>

          <FadingTransitionView index={1} xOffset={xOffset} style={styles.navBarContent}>
            <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> People </Text>
            </View>
          </FadingTransitionView>

          <FadingTransitionView index={2} xOffset={xOffset} style={styles.navBarContent}>
            <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> Messages </Text>
            </View>
          </FadingTransitionView>
        </NavBar>

        

        

        {/* <FadingTransitionView index={1} xOffset={xOffset} style={styles.navBarTitleContainer}>
          <NavBar absolute={true}>
            <View style={styles.avatarContainer}>
              <Avatar
                size={40}
                rounded
                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                containerStyle={styles.avatar}
              />
            </View>

              <Text> Testing this </Text>
            
          </NavBar>
        </FadingTransitionView> */}

        <Swiper 
          showsButtons={false} 
          loop={false} 
          index={0} 
          scrollEventThrottle={16}
          onScroll={onScroll}
          onIndexChanged={(index) => this.setState({pageIndex: index})}
          renderPagination={SwipePagination}
        >
          <Courses />
          <People />
          <Messages />
        </Swiper>
      </View>
    );
  }
}