import React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { MeteorComplexListView } from 'react-native-meteor';
import { ListItem } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: "95%"
  },
  rowContainer:{ 
    width: "95%",
    borderColor: "lightgray",
    borderBottomWidth: 1
  },
  scrollViewContainer: {
    alignItems: "center",
    flex: 1,
    width: "100%"
  },
});

const MyGroupsList = (props) => {
  const { groups, ready } = props;

  if (!ready) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <MeteorComplexListView
          elements={() => props.groups}
          renderRow={(group) => (
            <ListItem
              containerStyle={styles.rowContainer}
              key={group._id}
              title={group.title}
              subtitle={group.members.length + " people"}
              onPress={() => props.navigation.navigate('Chat', {id: group._id})}
            />
          )
            
          }
        />
      </View>
    </ScrollView>
  );
};

export default MyGroupsList
