import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    color: 'black',
    backgroundColor: 'gray',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#cd84f1',
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 55,
    color: 'white',
    fontFamily: 'Milkshake',
  },
});

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'zac',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}> HelpMates </Text>
        </View>
      </View>
    );
  }
}
