import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

class NewFileButton extends React.Component {

  render() {
  
    return (
      <View style={styles.container}>
        <Icon name='add' size={30} color={'white'} />
      </View>
    );
  }
}

export default NewFileButton;
