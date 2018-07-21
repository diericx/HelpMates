import React from 'react';
import firebase from './lib/Firebase';

import { AuthStack, TabNavigation } from './config/routes';
import Loading from "./components/Loading"
import settings from './config/settings';
import styles from './config/styles';

class HelpMates extends React.Component {
  // Initially set loading to true until we get info from firebase
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  // Subscribe to auth events on mount
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  // End the subscription when the component unmounts
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { loading, user } = this.state;
    if (loading) {
      return <Loading size="large"/>;
    } else if (user !== null) {
      return <TabNavigation />;
    }
    return <AuthStack />;
  }
}

export default HelpMates;