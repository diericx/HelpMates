import React from 'react';
import { View, Text, Button, FlatList, StatusBar, AsyncStorage } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor, { Accounts, createContainer } from 'react-native-meteor';

import DataRow from '../components/general/DataRow';

const UNI_ID = 'bJ2ppiHYrMFRThfWE';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    marginTop: 20,
    flexDirection: 'column',
    flex: 1,
  },
  list: {},
});

// Data for debugging layout
mockCourseData = [
  { key: 0, course_name: 'Computer Science I' },
  { key: 1, course_name: 'Computer Science II' },
  { key: 2, course_name: 'Computer Science III' },
];

class ChooseCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loginToken: '',
    };

    console.log(Meteor.status());

    console.log(props);

    // Meteor.call('courses.getAllForUni', { universityId: UNI_ID }, (err, res) => {
    //   // Do whatever you want with the response
    //   this.setState({ courses: res });
    //   console.log('Items.addOne', err, res);
    // });

    // console.log(this.state);

    // Bind functions to this
    this.onPress = this.onPress.bind(this);
  }

  openAuthScreen() {
    this.props.navigation.navigate('Auth');
  }

  onPress(params) {
    this.props.navigation.navigate('ChooseTutor', params);
  }

  render() {
    const { loggingIn } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text>{this.state.courses.length} </Text>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={mockCourseData}
            renderItem={({ item }) => (
              <DataRow id={item.key} title1={item.course_name} onPress={this.onPress} />
            )}
          />
        </View>
      </View>
    );
  }
}

const container = createContainer(
  props => ({
    ...props,
    loggingIn: Meteor.loggingIn(),
  }),
  ChooseCourseScreen,
);

container.navigationOptions = {
  title: 'HelpMates',
  headerStyle: {
    backgroundColor: '#cd84f1',
  },

  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Milkshake',
  },
};

export default container;
