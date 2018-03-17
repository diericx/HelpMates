import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';

import styles from './styles';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.defaultSize = 45;
  }
  onPress() {
    this.props.onPress(this.props.params);
  }

  render() {
    const size = this.props.size ? this.props.size : this.defaultSize;

    return (
      <Avatar
        rounded
        width={size}
        height={size}
        source={{ uri: this.props.url }}
        containerStyle={styles.container}
      />
    );
  }
}
