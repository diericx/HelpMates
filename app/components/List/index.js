import React from "react";
import { View, SectionList, Text } from "react-native";
import { List, ListItem } from "react-native-elements";

import styles from "./styles";

export default class CourseList extends React.Component {
  // formatData() {
  //   const { courses } = this.props;
  //   return courses.reduce((acc, course) => {
  //     const foundIndex = acc.findIndex(element => element.key === course.subject);
  //     if (foundIndex === -1) {
  //       return [
  //         ...acc,
  //         {
  //           key: course.subject,
  //           data: [{ ...course }],
  //         },
  //       ];
  //     }
  //     acc[foundIndex].data = [...acc[foundIndex].data, { ...course }];
  //     return acc;
  //   }, []);
  // }

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
          ListFooterComponent={() => <View style={styles.listFooter} />}
        />
      </List>
    );
  }
}
