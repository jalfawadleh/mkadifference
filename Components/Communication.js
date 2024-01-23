// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function Communication({user}) {
  const [nav, setNav] = useState('');

  return (
    <>
      <View style={styles.menu}>
        <Text
          style={nav === 'updates' ? styles.menuItemActive : styles.menuItem}
          onPress={() => setNav('updates')}>
          Updates
        </Text>
        <Text
          style={nav === 'messages' ? styles.menuItemActive : styles.menuItem}
          onPress={() => setNav('messages')}>
          Messages
        </Text>
        <Text
          style={nav === 'contacts' ? styles.menuItemActive : styles.menuItem}
          onPress={() => setNav('contacts')}>
          Contacts
        </Text>
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
    padding: 0,

    justifyContent: 'space-around',

    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
  },
  menuItemActive: {
    fontSize: 18,
    padding: 10,
    color: '#fff4e6',
  },

  items: {
    marginTop: 5,
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
