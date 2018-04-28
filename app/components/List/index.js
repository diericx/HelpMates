import React from "react";
import { View, SectionList, Text } from "react-native";
import { List, ListItem } from "react-native-elements";

import styles from "./styles";

export default class CourseList extends React.Component {
  renderSectionHeader(section) {
    if (section.key === "NONE") {
      return <View />;
    }
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}> {section.key} </Text>
      </View>
    );
  }

  render() {
    const { data } = this.props;
    if (!data || data.length === 0) {
      return (
        <View>
          <Text style={styles.noneMessageText}> {this.props.noneMessage} </Text>
        </View>
      );
    }
    return (
      <List containerStyle={styles.container}>
        <SectionList
          renderItem={({ item }) =>
            this.props.renderItem ? (
              this.props.renderItem(item)
            ) : (
              <ListItem
                containerStyle={styles.listItemContainer}
                title={item.title1}
                subtitle={item.title2}
                onPress={() => this.props.onPress({ course: item })}
                hideChevron={this.props.hideChevron}
              />
            )
          }
          renderSectionHeader={({ section }) =>
            this.renderSectionHeader(section)
          }
          keyExtractor={item => item._id}
          sections={this.props.data}
          ListFooterComponent={() =>
            this.props.footer == false ? (
              <View />
            ) : (
              <View style={styles.listFooter} />
            )
          }
        />
      </List>
    );
  }
}
