import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import SepperatorView from '../shared/SepperatorView';
import ListViewSubtitle from '../shared/ListViewSubtitle';
import EmptyList from '../shared/EmptyList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  buttonTitle: {
    color: '$lightblue',
    marginLeft: -8,
  },
  button: {
    backgroundColor: 'white',
  },
  icon: {
    color: '$lightblue',
    padding: 0,
    margin: 0,
  },
});

/**
 * Displays a list of the groups given as a prop and connects onPress to each one,
 * usually navigating to that group's specific screen.
 */
const MyGroupsList = props => {
  const { groups, onPress } = props;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={groups}
        ListEmptyComponent={
          <EmptyList
            centered
            text={
              "You aren't in any groups! \n\nGo to the Explore tab to find your courses and join some groups"
            }
          />
        }
        renderItem={({ item, index }) => {
          const { members } = item;
          const headCount = Object.keys(members).length;

          return (
            <SepperatorView renderTop={index === 0} renderBottom={index === groups.length - 1}>
              <ListItem
                key={item.id}
                title={item.title}
                subtitle={<ListViewSubtitle subtitle="TODO - Course Title" userCount={headCount} />}
                leftIcon={{
                  name: 'verified-user',
                  size: 35,
                  iconStyle: styles.icon,
                }}
                onPress={() => onPress(item)}
                chevron
              />
            </SepperatorView>
          );
        }}
      />
    </View>
  );
};

MyGroupsList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default MyGroupsList;
