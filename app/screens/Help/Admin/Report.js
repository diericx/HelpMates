import React from 'react';
import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import NavigationService from '../../../config/navigationService';

const styles = EStyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});

/**
 * This screen is only seen by admins. It will give the admin the ability
 * to see all feedback from user's so they can react to the data.
 */
@compose(
  // Now that we have auth, use the UID
  firestoreConnect(({ navigation }) => {
    const reportId = navigation.getParam('reportId', null);
    return [
      {
        collection: 'reports',
        doc: reportId,
        storeAs: `report-${reportId}`,
      },
    ];
  }),
  // Finally, setup final props
  connect(({ firestore }, { auth, navigation }) => {
    const reportId = navigation.getParam('reportId', null);
    return {
      report: firestore.data[`report-${reportId}`],
      reportId,
      auth,
    };
  }),
  withFirestore
)
export default class FeedbackChatsAdmin extends React.Component {
  constructor() {
    super();
    this.approveReport = this.approveReport.bind(this);
    this.denyReport = this.denyReport.bind(this);
  }

  approveReport() {
    const { firestore, report, reportId } = this.props;
    // Update the status of the report
    firestore.update(
      {
        collection: 'reports',
        doc: reportId,
      },
      {
        status: 'Approved',
      }
    );
    // Update the status of the message
    firestore.update(
      {
        collection: 'groups',
        doc: report.groupId,
        subcollections: [{ collection: 'messages', doc: report.message._id }],
      },
      {
        deleted: true,
      }
    );
  }

  denyReport() {
    const { firestore, reportId } = this.props;
    firestore.update(
      {
        collection: 'reports',
        doc: reportId,
      },
      {
        status: 'Denied',
      }
    );
  }

  renderMessageReport() {
    const { report } = this.props;
    return (
      <View>
        <Text>MessageText: {report.message.text}</Text>
      </View>
    );
  }

  renderUserReport() {
    const { report } = this.props;
  }

  render() {
    const { report } = this.props;
    if (!isLoaded(report)) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Text style={styles.header}>{`${report.type} Report`}</Text>
          <Text>Status: {report.status}</Text>
          {report.type === 'Message' ? this.renderMessageReport() : this.renderUserReport()}
          <Button title="Approve" onPress={this.approveReport} />
          <Button title="Deny" onPress={this.denyReport} />
        </View>
      </ScrollView>
    );
  }
}
