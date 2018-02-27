import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

import styles from './styles';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.onPress = this.onPress.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate('CoursesShow', params);
  }

  filterCourses() {
    return this.props.courses.filter((course) => {
      const filter = this.props.filter.toLowerCase();
      const title1 = course.title1.toLowerCase();
      const title2 = course.title2.toLowerCase();
      if (title1.indexOf(filter) != -1 || title2.indexOf(filter) != -1) {
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <View>
        {this.filterCourses().map((u, i) => (
          <ListItem
            key={i}
            title={u.title1}
            subtitle={u.title2}
            containerStyle={styles.listItemContainer}
            onPress={() => this.onPress({ id: u._id, title: u.title1 })}
          />
        ))}
      </View>
    );
  }
}
