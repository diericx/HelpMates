import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { GetCoursesForUniversity, GetCurrentUser } from '../../../lib/Firebase';
import { ListItem, Button } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import ListViewSubtitle from '../../ListViewSubtitle';

import styles from './styles';

class CourseList extends React.Component {
  state = {
    ready: false,
  }

  keyExtractor = (item, index) => item.id

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Get props
    const { universityId } = this.props;
    
    // Get data from Firebase
    GetCoursesForUniversity({
      universityId 
    },
    (courses => {
      this.setState({
        courses,
        ready: true
      })
    }))
  }

  render() {
    let { courses, ready } = this.state;
    let currentUser = GetCurrentUser();

    if (!ready) {
      return <ActivityIndicator />
    }
    
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={courses}
          renderItem={({item, index}) => {
            console.log(item);
            let { members } = item;
            let isUserInCourse = members.includes(currentUser.uid);
  
            return <ListItem
              key={item._id}
              // leftAvatar={{ source: { uri: l.avatar_url } }}
              containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
              title={item.title}
              subtitle={<ListViewSubtitle subtitle={item.subtitle} userCount={members.length} />}
              rightTitle={
                isUserInCourse ? null :
                <Button
                  title='Unlock'
                  titleStyle={styles.title}
                  icon={
                    {
                      name: 'lock', 
                      size: 18, 
                      iconStyle: styles.icon
                    }
                  }
                  buttonStyle={styles.button}
                  onPress={() => JoinCourse(item._id) }
                />
              }
              onPress={isUserInCourse ? () => this.props.onPress(item) : null}
              chevron={isUserInCourse}
            />
            }
          }
        />
      </View>
    );
  }
}

export default CourseList;
