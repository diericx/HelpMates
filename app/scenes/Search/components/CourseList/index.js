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
    this.props.navigation.navigate('ShowCourse', params);
  }

  render() {
    return (
      <View>
        {this.props.courses.map((u, i) => (
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
