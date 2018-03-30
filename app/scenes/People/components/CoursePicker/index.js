import React from 'react';
import { View } from 'react-native';
import Meteor from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  changeSelected(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    const { courses } = this.props;
    return (
      <View>
        {Object.keys(courses).map((courseId, index) => {
          const courseName = Meteor.collection('courses').findOne({ _id: courseId }).title1;
          return (
            <ListItem
              key={index}
              roundAvatar
              title={courseName}
              containerStyle={styles.listItemContainer}
              onPress={() => this.props.onSelectCourse(courseId)}
            />
          );
        })}
      </View>
    );
  }
}
