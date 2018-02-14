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
mockTutorData = [
  { key: 0, tutor_name: 'Zac Holland' },
  { key: 1, tutor_name: 'Charlie Clark' },
  { key: 2, tutor_name: 'Kerec Spinney' },
  { key: 3, tutor_name: 'Ben Jones' },
  { key: 4, tutor_name: 'John Doe' },
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
  }

  tutorSelectHandler() {}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={mockTutorData}
            renderItem={({ item }) => (
              <DataRow id={item.key} title1={item.tutor_name} onPress={this.onPress} />
            )}
          />
        </View>
      </View>
    );
  }
}
