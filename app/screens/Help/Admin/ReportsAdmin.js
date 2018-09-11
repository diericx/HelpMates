import React from 'react';
import { View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import NavigationService from '../../../config/navigationService';

const styles = EStyleSheet.create({
  subtitle: {
    color: 'gray',
  },
});

/**
 * This screen is only seen by admins. It will give the admin the ability
 * to see all feedback from user's so they can react to the data.
 */
@compose(
  // Now that we have auth, use the UID
  firestoreConnect(() => [
    {
      collection: 'reports',
      orderBy: ['createdAt', 'desc'],
    },
  ]),
  // Finally, setup final props
  connect(({ firestore }, { auth }) => ({
    reports: firestore.ordered.reports,
    auth,
  }))
)
export default class ReportsAdmin extends React.Component {
  render() {
    const { reports } = this.props;

    if (!isLoaded(reports)) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <FlatList
            data={reports}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const icon = {
                type: 'font-awesome',
                name: 'exclamation-triangle',
                color: '#ffaf40',
              };
              if (item.status === 'Pending Review') {
                // do nothing, exclamation tri is right
              } else if (item.status === 'Denied') {
                icon.name = 'ban';
                icon.color = '#ff3838';
              } else if (item.status === 'Approved') {
                icon.name = 'check';
                icon.color = '#32ff7e';
              }

              return (
                <ListItem
                  title={item.id}
                  subtitle={item.type}
                  subtitleStyle={styles.subtitle}
                  onPress={() => NavigationService.navigate('Report', { reportId: item.id })}
                  leftIcon={icon}
                  chevron
                />
              );
            }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    );
  }
}
