import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import FileList from '../../components/MyGroups/FileList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroupContainer: {
    height: 30,
    width: '100%',
    marginLeft: -1,
    marginTop: -2,
    marginBottom: 0,
    padding: 0,
    // borderColor: 'red',
  },
  button: {
    borderWidth: 0,
    borderColor: 'red',
  },
  selectedButtonStyle: {
    backgroundColor: 'white',
    borderColor: 'red'
  },
  selectedText: {
    color: '#4f4f4f',
    fontWeight: 'bold'
  }
});

class GroupFiles extends React.Component {
  render() {

    const groupId = this.props.navigation.getParam("groupId", null);

    return (
      <View style={styles.container}>
        <FileList parentId={groupId} />
      </View>
    );
  }
}

export default GroupFiles;