// NavigationService creates an object that is connected to the top level
//  react component. This allows us to use it as a reference and dispatch
//  navigation commands from any component in our app.
import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function push(routeName, params) {
  const pushAction = StackActions.push({
    routeName,
    params,
  });

  _navigator.dispatch(pushAction);
}

function pop() {
  const pushAction = StackActions.pop();

  _navigator.dispatch(pushAction);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  push,
  pop,
  setTopLevelNavigator,
};
