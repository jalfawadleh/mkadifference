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
    padding: 5,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',

    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  menuItem: {
    margin: 5,
    padding: 5,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,

    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },

  menuItemActive: {
    margin: 5,
    padding: 5,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,

    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    backgroundColor: '#fff4e6',
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
