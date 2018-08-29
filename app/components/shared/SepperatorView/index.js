import React from 'react';

import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  sepperator: {
    width: '85%',
    alignSelf: 'flex-end', 
    height: 0.5,
    backgroundColor: 'lightgray'
  }
});

export default class Sepperator extends React.Component {
  render() {
    let renderTop = this.props.renderTop != null ? this.props.renderTop : true;
    let renderBottom = this.props.renderBottom != null ? this.props.renderBottom : true;
    return (
      <View style={styles.container}>
        {renderTop ? 
          <View style={styles.sepperator}>
          </View> 
        : 
          null 
        }
        {this.props.children}
        {renderBottom ? 
          <View style={styles.sepperator}>
          </View> 
        : 
          null 
        }
      </View>
    );
  }
}