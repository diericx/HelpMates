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
      this.props.url ? 
      <Avatar
        rounded
        width={size}
        height={size}
        source={this.props.url ? { uri: this.props.url } : null}
        containerStyle={styles.container}
      />
      : <Avatar
      rounded
      width={size}
      height={size}
      title="MT"
      containerStyle={styles.container}
    />
    );
  }
}
