import React from 'react';
import { View, Text } from 'react-native';
import { Input } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";

import UserCard from "../UserCard";

import styles from './styles';

const UserList = (props) => {
  let { users } = props;
  return (
    <View style={styles.container}>
      {users.map(user => {
        return <UserCard user={user} key={user._id} />
      })}
    </View>
  );
};

// "envelope-o"
export default UserList;
