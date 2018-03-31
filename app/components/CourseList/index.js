import React from 'react';
import { View, SectionList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import List from '../List/index';

import styles from './styles';

export default class CourseList extends React.Component {
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

  render() {
    return (
      <List
        data={this.formatData()}
        onPress={this.props.onPress}
        hideChevron={this.props.hideChevron}
      />
    );
  }
}
