import React from 'react';
import { Image, View, Text, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from "react-native-elements";
import Swiper from 'react-native-swiper';
import { BlurView } from "expo";
import { Ionicons } from '@expo/vector-icons';

// Main App Screens
import Messages from '../../../screens/Messages';
import Home from '../../../screens/Home';
import HelpSessions from '../../../screens/HelpSessions';

// Helper Shit
import SwipePagination from "../SwipePagination";
import NavBar from "../NavBar";
import Search from "../../Search";

import styles from "./styles"

const xOffset = new Animated.Value(0);

const onScroll = Animated.event(
  [
    { nativeEvent: { contentOffset: { x: xOffset } } }
  ]
);

export default class SwipeNav extends React.Component {
  state = {
    pageIndex: 1,
    searchOverlayIntensity: new Animated.Value(0),
    isSearching: false
  }

  renderSearchOverlay() {
    return (
      <Animated.View style={[styles.searchFade, {opacity: this.state.searchOverlayIntensity}]}>
        <BlurView tint="dark" intensity={100} style={styles.searchFade}>
          <Search onCloseSearchOverlay={this.toggleSearch.bind(this)} />
        </BlurView>
      </Animated.View>
    )
    
  }

  toggleSearch() {
    let {isSearching} = this.state

    if (isSearching) {
      Animated.timing(                  
        this.state.searchOverlayIntensity,            
        {
          toValue: 0,                   
          duration: 250,              
          useNativeDriver: true
        }
      ).start(() => this.setState({isSearching: false}) ); 
      
    } else {
      this.setState({isSearching: true}, () => {
        Animated.timing(                  
          this.state.searchOverlayIntensity,            
          {
            toValue: 1,                   
            duration: 250,     
            useNativeDriver: true         
          }
        ).start(); 
      })
      
      
    }
    
  }

  render(){
    return (
      <View style={styles.swipeNavContainer}>

        <NavBar placeholder />

        <NavBar absolute index={0} xOffset={xOffset} isSearch={true} text={"Search"}>
            {/* <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> Messages </Text>
            </View> */}
            <Search placeholder text={"Messages"} onOpenSearchOverlay={this.toggleSearch.bind(this)} />
        </NavBar>

        <NavBar absolute index={1} xOffset={xOffset}>
            {/* <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> Home </Text>
            </View> */}
            <Search placeholder text={"Home"} onOpenSearchOverlay={this.toggleSearch.bind(this)} />
        </NavBar>

        <NavBar absolute index={2} xOffset={xOffset}>
            {/* <View style={styles.navBarTitleContainer}>
              <Text style={styles.navBarTitle}> HelpSessions </Text>
            </View> */}
            <Search placeholder text={"Sessions"} onOpenSearchOverlay={this.toggleSearch.bind(this)} />
        </NavBar>
        
        <Swiper 
          showsButtons={false} 
          loop={false} 
          index={1} 
          scrollEventThrottle={16}
          onScroll={onScroll}
          onIndexChanged={(index) => this.setState({pageIndex: index})}
          renderPagination={SwipePagination}
        >
          <Messages navigation={this.props.navigation}/>
          <Home navigation={this.props.navigation} />
          <HelpSessions navigation={this.props.navigation} />
        </Swiper>

      {
        this.state.isSearching ? 
          this.renderSearchOverlay()
        :
          null
      }
        
      {/* <View style={styles.searchFade}>
      </View> */}


      </View>
    );
  }
}