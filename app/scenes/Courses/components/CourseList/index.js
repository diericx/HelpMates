import React from 'react';
import { View, SectionList, ActivityIndicator, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import styles from './styles';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.courses);
    // bind
    this.onPress = this.onPress.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate('ShowCourse', params);
  }

  formatData() {
    const { courses } = this.props;
    return courses.reduce((acc, course) => {
      const foundIndex = acc.findIndex(element => element.key === course.subject);
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            key: course.subject,
            data: [{ ...course }],
          },
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, { ...course }];
      return acc;
    }, []);
  }

  renderSectionHeader(section) {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}> {section.key} </Text>
      </View>
    );
  }

  render() {
    return (
      <List containerStyle={styles.container}>
        <SectionList
          renderItem={({ item }) => <ListItem title={`${item.title1}`} subtitle="Something cool" />}
          renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
          keyExtractor={item => item.title2}
          sections={this.formatData()}
        />
      </List>
    );
  }
}
