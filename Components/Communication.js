// import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function Communication({user}) {
  //const x = `https://api.multiavatar.com/${probs.user.username}.png`;

  return (
    <>
      <View style={styles.menu}>
        <Text style={styles.menuItem}>Notifications</Text>
        <Text style={styles.menuItem}>Messages</Text>
        <Text style={styles.menuItem}>Contacts</Text>
      </View>
      <View style={styles.items}>
        <Text style={styles.item}>{user._id}</Text>
        <Text style={styles.item}>{user._id}</Text>
        <Text style={styles.item}>{user._id}</Text>
        <Text style={styles.item}>{user._id}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    margin: 0,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  menuItem: {
    padding: 5,
    margin: 5,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,

    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },

  items: {
    margin: 0,
    padding: 0,
  },
  item: {
    margin: 10,
    padding: 10,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
});
