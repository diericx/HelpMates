import React from 'react';
import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Image } from 'react-native-expo-image-cache';
import NavigationService from '../../../config/navigationService';

const styles = EStyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
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
    if (report.type === 'message') {
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
    } else if (report.type === 'image') {
      // Update the status of the image
      firestore.update(
        {
          collection: 'files',
          doc: report.fileId,
        },
        {
          deleted: true,
        }
      );
    }
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

  renderReportDataToReview = () => {
    const { report } = this.props;
    const { file } = report;
    if (report.type === 'message') {
      return (
        <View style={styles.reportDataContainer}>
          <Text>MessageText: {report.message.text}</Text>
        </View>
      );
    }
    if (report.type === 'image') {
      return (
        <View style={styles.reportDataContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            {...{ uri: file.uri, preview: { uri: file.preview } }}
          />
        </View>
      );
    }

    return (
      <View>
        <Text>Error: Unrecognized report data. There is nothing to review!</Text>
      </View>
    );
  };

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
          {this.renderReportDataToReview()}
          <Button title="Approve" onPress={this.approveReport} />
          <Button title="Deny" onPress={this.denyReport} />
        </View>
      </ScrollView>
    );
  }
}
