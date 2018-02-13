import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Button, FlatList, StatusBar } from 'react-native';
import DataRow from '../components/general/DataRow';

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

export default class ChooseCourseScreen extends React.Component {
  static navigationOptions = {
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

  constructor(props) {
    super(props);
    this.props.navigation.navigate('Auth');
    this.onPress = this.onPress.bind(this);
  }

  onPress(params) {
    this.props.navigation.navigate('ChooseTutor', params);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
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
