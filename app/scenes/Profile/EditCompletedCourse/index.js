import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { View, FlatList, Button, Text, TextInput } from 'react-native';
import { Input } from 'react-native-elements';

import styles from './styles';

class Index extends React.Component {
  constructor(props) {
    super(props);
    // bind
    // this.onAddCourseButtonPress = this.onAddCourseButtonPress.bind(this);
  }

  // onAddCourseButtonPress() {
  //   console.log(this.props.navigation);
  //   this.props.navigation.navigate('AddCourse');
  // }

  // METEOR - remove course
  onRemoveCoursePress(courseId) {
    Meteor.call('users.removeCompletedCourse', { courseId }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
      }
    });
  }

  // METEOR - set rate
  setRateForCourse(courseId, rate) {
    Meteor.call('users.setRateForCourse', { courseId, rate }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
      }
    });
  }

  // getCourseData(completedCourses) {
  //   const newCompletedCourses = completedCourses;
  //   Object.entries(newCompletedCourses).forEach(([key, value]) => {
  //     const courseData = Meteor.collection('courses').findOne(key);
  //     if (!courseData) {
  //       return null;
  //     }

  //     newCompletedCourses[key] = {
  //       rate: value,
  //       title1: courseData.title1,
  //       title2: courseData.title2,
  //     };
  //   });
  //   return newCompletedCourses;
  // }

  // compareCourseData(a, b) {
  //   if (a[1].title2 < b[1].title2) {
  //     return -1;
  //   } else if (a[1].title2 > b[1].title2) {
  //     return 1;
  //   }
  //   // a must be equal to b
  //   return 0;
  // }

  // render() {
  //   let { completedCourses } = this.props;
  //   completedCourses = Object.entries(this.getCourseData(completedCourses));
  //   completedCourses.sort(this.compareCourseData);
  //   return (
  //     <View style={styles.container}>
  //       <ScrollView>
  //         {completedCourses.map(([key, value]) => (
  //           <Card title={value.title1} subtitle={value.title2} key={key}>
  //             <View style={styles.courseCardContainer}>
  //               <View>
  //                 <Picker
  //                   style={styles.ratePicker}
  //                   itemStyle={{ height: 130 }}
  //                   selectedValue={value.rate}
  //                   onValueChange={(itemValue, itemIndex) => this.setRateForCourse(key, itemValue)}
  //                 >
  //                   <Picker.Item label="$5" value={5} />
  //                   <Picker.Item label="$10" value={10} />
  //                   <Picker.Item label="$15" value={15} />
  //                   <Picker.Item label="$20" value={25} />
  //                   <Picker.Item label="$20" value={30} />
  //                   <Picker.Item label="$20" value={35} />
  //                 </Picker>
  //               </View>
  //               <Button
  //                 title="Remove Course"
  //                 textStyle={{ fontWeight: '700' }}
  //                 buttonStyle={styles.removeCourseButton}
  //                 containerStyle={{ marginTop: 20 }}
  //                 onPress={() => this.onRemoveCoursePress(key)}
  //               />
  //             </View>
  //           </Card>
  //         ))}
  //       </ScrollView>
  //     </View>
  //   );
  // }

  render() {
    const { course } = this.props;
    console.log(course);
    // if the data is here and ready, load the list
    return (
      <View style={styles.container}>
        <Input
          placeholder="Enter your rate for this course"
          value={course.rate}
          number-pad
          numeric
        />
      </View>
    );
  }
}

const container = createContainer((params) => {
  const { course } = params.navigation.state.params;
  // subscribe to meteor collections
  Meteor.subscribe('course', { _id: course._id });
  return {
    course: Meteor.collection('courses').find({ _id: course._id }),
  };
}, Index);

container.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Edit',
});

export default container;
