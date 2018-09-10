import React from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import NavigationService from '../../config/navigationService';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: 'gray',
  },
  header: {
    justifyContent: 'center',
    // backgroundColor: '$lightgray',
    height: 45,
    paddingLeft: 15,
  },
  subtitle: {
    color: 'gray',
    paddingVertical: 3,
    fontSize: 12,
  },
});

@compose(
  // Connect first to feed auth into firestoreConnect
  connect(({ firebase: { auth } }) => ({
    auth,
  })),
  // Now that we have auth, use the UID
  firestoreConnect(({ auth }) => [
    {
      collection: 'reports',
      where: ['reporterId', '==', auth.uid],
      storeAs: 'myReports',
    },
  ]),
  // Finally, setup final props
  connect(({ firestore }, { auth }) => ({
    supportChat: firestore.data.supportChat,
    myReports: firestore.ordered.myReports,
    auth,
  }))
)
class Help extends React.Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Chat',
  });

  goToFeedbackChat() {
    NavigationService.navigate('SupportChat');
  }

  render() {
    const { myReports } = this.props;

    if (!isLoaded(myReports)) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <FlatList
            data={[{ key: '0' }]}
            renderItem={item => (
              <ListItem
                title="Chat"
                subtitle="A direct chat to our entire team"
                subtitleStyle={styles.subtitle}
                onPress={() => this.goToFeedbackChat(item)}
                leftIcon={{
                  type: 'entypo',
                  name: 'chat',
                  color: '#3ae374',
                }}
                chevron
              />
            )}
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Connect</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>

        <View>
          <FlatList
            data={myReports}
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
              } else if (item.status === 'Accepted') {
                icon.name = 'check';
                icon.color = '#32ff7e';
              }
              return (
                <ListItem
                  title={`${item.type} #${item.id}`}
                  subtitle={item.status}
                  subtitleStyle={styles.subtitle}
                  leftIcon={icon}
                />
              );
            }}
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <Text style={styles.headerText}>My Reports</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Help;
