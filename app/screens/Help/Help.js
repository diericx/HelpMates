import React from 'react';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import NavigationService from '../../config/navigationService';
import SepperatorView from '../../components/shared/SepperatorView';

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
      where: ['reporter', '==', auth.uid],
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

  onPress(item) {
    if (item.type === 'chat') {
      NavigationService.navigate('SupportChat');
    } else if (item.type == 'user-report' || item.type == 'message-report') {
      NavigationService.navigate('Report');
    }
  }

  render() {
    const { myReports } = this.props;

    if (!isLoaded(myReports)) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <SectionList
        renderSectionHeader={({ section: { title, data } }) =>
          data.length === 0 ? null : (
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
          )
        }
        renderItem={({ item, index }) => {
          const leftIcon = { name: 'file-text', type: 'feather', size: 30, color: '#3f3f3f' };
          if (item.type == 'chat') {
            leftIcon.type = 'entypo';
            leftIcon.name = 'chat';
            leftIcon.color = '#3ae374';
          } else {
            leftIcon.name = 'report-problem';
            leftIcon.type = 'material-community';
            leftIcon.color = '#ff3838';
          }
          return (
            <SepperatorView renderTop={false} renderBottom>
              <ListItem
                key={item.id}
                title={item.title}
                subtitle={item.subtitle == null ? null : item.subtitle}
                subtitleStyle={styles.subtitle}
                containerStyle={[styles.itemBottomBorder, index == 0 ? styles.itemTopBorder : null]}
                onPress={() => this.onPress(item)}
                leftIcon={leftIcon}
                chevron
              />
            </SepperatorView>
          );
        }}
        sections={[
          {
            title: 'Chat',
            data: [
              {
                type: 'chat',
                title: 'Feedback',
                subtitle: 'Find a bug or want a feature? Tell us!',
              },
            ],
          },
          { title: 'Reports', data: myReports },
        ]}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

export default Help;
