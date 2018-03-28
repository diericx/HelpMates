import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import GetHelp from '../components/GetHelp/index';
import Ratings from '../components/Ratings/index';
import ProfileCard from '../components/ProfileCard/index';

import styles from './styles';

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
      selectedGroup: 0,
      selectedCourse: null,
    };
    // get this users availabilities
    this.getAvailabilities();
    // bind
    this.updateGroup = this.updateGroup.bind(this);
    this.onSelectCourse = this.onSelectCourse.bind(this);
  }

  onSelectCourse(courseId) {
    this.setState({
      selectedCourse: courseId,
    });
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

  updateGroup(selectedGroup) {
    this.setState({ selectedGroup });
  }

  render() {
    const buttons = ['Get Help', 'Reviews'];
    const { user } = this.state.params;
    const { selectedGroup } = this.state;

    return (
      <View style={styles.container}>
        <ProfileCard user={user} />
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            onPress={this.updateGroup}
            selectedIndex={selectedGroup}
            buttons={buttons}
            containerStyle={styles.buttonGroup}
          />
        </View>
        {this.state.selectedGroup === 0 ? (
          <GetHelp
            user={user}
            onSelectCourse={this.onSelectCourse}
            selectedCourse={this.state.selectedCourse}
          />
        ) : (
          <Ratings user={user} />
        )}
      </View>
    );
  }
}

const container = createContainer(params => ({}), Show);

container.navigationOptions = {
  headerTitle: 'Get Help',
};

export default container;
