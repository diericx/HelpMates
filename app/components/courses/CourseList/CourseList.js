import React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { MeteorListView } from 'react-native-meteor';
import { ListItem } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: "95%"
  },
  rowContainer:{ 
    width: "95%",
    borderColor: "lightgray",
    borderBottomWidth: 1
  },
  scrollViewContainer: {
    alignItems: "center",
    flex: 1,
    width: "100%"
  },
});

const CourseList = (props) => {
  const { courses, coursesReady } = props;

  if (!coursesReady) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <MeteorListView
          collection="courses"
          selector={props.selector || {}}
          options={{ sort: { createdAt: -1 } }}
          renderRow={(course) => (
            <ListItem
              containerStyle={styles.rowContainer}
              key={course._id}
              title={course.title1}
              subtitle={course.title2}
              onPress={() => props.navigation.navigate('Chat')}
            />
          )
            
          }
        />
      </View>
    </ScrollView>
  );
};

export default CourseList
