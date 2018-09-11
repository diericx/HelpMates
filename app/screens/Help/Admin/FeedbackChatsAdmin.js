import React from 'react';
import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import NavigationService from '../../../config/navigationService';

const styles = EStyleSheet.create({});

/**
 * This screen is only seen by admins. It will give the admin the ability
 * to see all feedback from user's so they can react to the data.
 */
@compose(
  // Now that we have auth, use the UID
  firestoreConnect(() => [
    {
      collection: 'feedbackChats',
      orderBy: ['lastMessage'],
    },
  ]),
  // Finally, setup final props
  connect(({ firestore }, { auth }) => ({
    reports: firestore.ordered.reports,
    feedbackChats: firestore.ordered.feedbackChats,
    auth,
  }))
)
export default class FeedbackChatsAdmin extends React.Component {
  render() {
    const { feedbackChats } = this.props;
    if (!isLoaded(feedbackChats)) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <FlatList
            data={feedbackChats}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={item.userName}
                subtitleStyle={styles.subtitle}
                onPress={() =>
                  NavigationService.navigate('FeedbackChat', { feedbackChatId: item.userId })
                }
                leftIcon={{
                  type: 'entypo',
                  name: 'chat',
                  color: '#3ae374',
                }}
                chevron
              />
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    );
  }
}
