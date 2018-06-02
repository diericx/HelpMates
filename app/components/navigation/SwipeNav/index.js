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

        <NavBar placeholder />

        <NavBar absolute index={0} xOffset={xOffset}>
            <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> Courses </Text>
            </View>
        </NavBar>

        <NavBar absolute index={1} xOffset={xOffset}>
            <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> People </Text>
            </View>
        </NavBar>

        <NavBar absolute index={2} xOffset={xOffset}>
            <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> Messages </Text>
            </View>
        </NavBar>

        <Swiper 
          showsButtons={false} 
          loop={false} 
          index={0} 
          scrollEventThrottle={16}
          onScroll={onScroll}
          onIndexChanged={(index) => this.setState({pageIndex: index})}
          renderPagination={SwipePagination}
        >
          <Courses navigation={this.props.navigation}/>
          <People navigation={this.props.navigation} />
          <Messages navigation={this.props.navigation} />
        </Swiper>


      </View>
    );
  }
}