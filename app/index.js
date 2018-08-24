import React from 'react';
import { Provider } from 'react-redux';
import { RootStack } from './config/routes';

// Create and get the store for firebase
import store from './config/createStore';

// Main view
class HelpMates extends React.Component {
  // Initially set loading to true until we get info from firebase
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}

export default HelpMates;