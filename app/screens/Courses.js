import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from "react-native-elements";
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../components/Button';
import FadingTransitionView from "../components/FadingTransitionView";
import Tab from '../components/Tab';
import CourseList from '../components/courses/CourseList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  navBarTitleContainer: {
    alignItems: "flex-end"
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    // color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

let tabs = [
  "Feed",
  "Chats",
  "Manage"
]

// TEST DATA
let courseList = [
  {
    _id: "1",
    title1: "Intro to Computer Science I",
    title2: "COMP 2731"
  },
  {
    _id: "2",
    title1: "Intro to Computer Science II",
    title2: "COMP 2732"
  },
  {
    _id: "3",
    title1: "Intro to Computer Science III",
    title2: "COMP 2733"
  }
]

class Courses extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedIndex: 0,
  }

  renderContent() {
    let {selectedIndex} = this.state
    if (selectedIndex == 0) {
      return null
    } else if (selectedIndex == 1) {
      return (
        <CourseList selector={{}} navigation={this.props.navigation} />
      )
    } else if (selectedIndex == 2) {
      return null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Tab 
          tabs={tabs} 
          selectedIndex={this.state.selectedIndex} 
          onPress={(index) => {
            this.setState({selectedIndex: index})
          }} 
        />

        <View style={styles.contentContainer}>
          {this.renderContent()}
        </View>

      </View>
    )
  }
}

export default Courses
