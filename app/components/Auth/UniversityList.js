import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import connect from 'react-redux/lib/connect/connect';
import { isLoaded, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  universityContainer: {
    paddingHorizontal: 20,
  },
  university: {
    borderRadius: 2,
    marginVertical: 15,
  },
});

@compose(
  firestoreConnect(),
  connect(({ firestore }) => ({
    universities: firestore.ordered.universities,
  }))
)
export default class UniversityList extends React.Component {
  componentWillMount() {
    const { firestore } = this.props;

    // Don't connect, just query this data once. No need for live updateds
    firestore.get('universities');
  }

  keyExtractor = item => item.id;

  render() {
    const { universities, headerTextStyle, scrollEnabled, onPress } = this.props;

    if (!isLoaded(universities)) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.headerText, headerTextStyle]}> Choose Your University </Text>
          </View>

          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, headerTextStyle]}> Choose Your University </Text>
        </View>

        <FlatList
          keyExtractor={this.keyExtractor}
          data={universities}
          scrollEnabled={scrollEnabled}
          renderItem={({ item }) => {
            const { color, backgroundColor } = item;
            return (
              <View style={styles.universityContainer}>
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={`${item.city}, ${item.state}`}
                  onPress={() => onPress(item)}
                  leftIcon={{ name: 'school', size: 30, color }}
                  titleStyle={{ color }}
                  subtitleStyle={{ color }}
                  containerStyle={[styles.university, { backgroundColor }]}
                  chevron
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}
