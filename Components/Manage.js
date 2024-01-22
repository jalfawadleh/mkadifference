// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Image, View} from 'react-native';
export default function Manage({user}) {
  //const x = `https://api.multiavatar.com/${probs.user.username}.png`;

  return (
    <>
      <View style={styles.menu}>
        <Text style={styles.menuItem}>Events</Text>
        <Text style={styles.menuItem}>Projects</Text>
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
    flex: 1,
    flexDirection: 'row',
    margin: 0,
    padding: 5,
  },
  menuItem: {
    flex: 1,

    margin: 5,
    padding: 5,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,

    textAlign: 'center',
    fontSize: 25,
  },

  items: {
    flex: 10,
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
