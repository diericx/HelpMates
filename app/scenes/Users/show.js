import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import update from 'immutability-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ScrollView } from 'react-native';
import { ButtonGroup, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import UserAgenda from './components/agenda';
import CoursePicker from './components/CoursePicker/index';
import ProfileCard from './components/profileCard';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  agenda: {
    flex: 1,
    width: '100%',
  },
  buttonGroupContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonGroup: {
    width: '80%',
    height: 30,
    marginTop: 10,
  },
  cardContainer: {
    flex: 1,
    marginBottom: 10,
  },
  cardScrollView: {
    height: '100%',
  },
  card: {
    height: '100%',
    marginTop: 0,
    backgroundColor: 'white',
  },
  agendaCard: {
    padding: 0,
  },
  agendaCardWrapper: {
    flex: 1,
    padding: 0,
  },
  sendRequestButton: {
    height: 45,
    backgroundColor: '$green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
  },
});

class Show extends React.Component {
  constructor(props) {
    super(props);
    // params from navigation
    const { params } = this.props.navigation.state;
    this.state = {
      params,
      startDate: null,
      endDate: null,
      availabilities: [],
      items: {},
      isModalVisible: false,
      selectedIndex: 0,
      selectedCourse: null,
    };
    // get this users availabilities
    this.getAvailabilities();
    // bind
    this.updateIndex = this.updateIndex.bind(this);
    this.onSelectCourse = this.onSelectCourse.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  // METEOR - get availabilities for this user
  getAvailabilities() {
    Meteor.call('users.getAvailabilities', { userId: this.state.params.userId }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ availabilities: res });
      if (err) {
        console.log(err);
      }
    });
  }

  onSelectCourse(courseId) {
    this.setState({
      selectedCourse: courseId,
    });
  }

  render() {
    const buttons = ['Get Help', 'Reviews'];
    const { user } = this.state.params;
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <ProfileCard name={user.profile.name} rating={user.profile.rating} />
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttonGroup}
          />
        </View>

        <View style={styles.cardContainer}>
          {!this.state.selectedCourse ? (
            <Card containerStyle={styles.card}>
              <ScrollView style={styles.cardScrollView}>
                <CoursePicker
                  courses={user.profile.completedCourses}
                  onSelectCourse={this.onSelectCourse}
                />
              </ScrollView>
            </Card>
          ) : (
            <Card
              containerStyle={[styles.card, styles.agendaCard]}
              wrapperStyle={styles.agendaCardWrapper}
            >
              <UserAgenda
                availabilities={user.profile.availabilities}
                name={this.state.params.name}
                userId={this.state.params.userId}
                courseId={this.state.params.courseId}
              />
            </Card>
          )}
        </View>
      </View>
    );
  }
}

const container = createContainer(params => ({}), Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    title: params.title || 'Choose Time Slot',
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
};

export default container;
