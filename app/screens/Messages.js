import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from "react-native-elements";
import EStyleSheet from 'react-native-extended-stylesheet';

import FadingTransitionView from "../components/FadingTransitionView";
import Tab from '../components/Tab';
import MyGroupsList from '../components/conversations/MyGroupsList';

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
  "Groups",
  "Chats",
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
      return <MyGroupsList navigation={this.props.navigation} />
    } else if (selectedIndex == 1) {
      return (
        null
      )
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
