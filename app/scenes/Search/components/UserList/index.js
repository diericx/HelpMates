import React from 'react';
import { View } from 'react-native';
import { ListItem, Rating } from 'react-native-elements';

import styles from './styles';

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.onPress = this.onPress.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate('ShowUser', params);
  }

  filterUsers() {
    return this.props.users.filter((user) => {
      const filter = this.props.filter.toLowerCase();
      const name = user.profile.name.toLowerCase();
      if (name.indexOf(filter) != -1) {
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <View>
        {this.filterUsers().map((u, i) => (
          <ListItem
            key={i}
            roundAvatar
            title={u.profile.name}
            subtitle={
              <View style={styles.ratingContainer}>
                <Rating imageSize={20} readonly startingValue={3} />
              </View>
            }
            avatar={{ uri: defaultAvatar }}
            containerStyle={styles.listItemContainer}
            onPress={() => this.onPress({ id: u._id, title: u.profile.name })}
          />
        ))}
      </View>
    );
  }
}
