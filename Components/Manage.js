// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function Manage({user}) {
  const [nav, setNav] = useState('');

  return (
    <>
      <View style={styles.menu}>
        <Text
          style={nav === 'events' ? styles.menuItemActive : styles.menuItem}
          onPress={() => setNav('events')}>
          Events
        </Text>
        <Text
          style={nav === 'projects' ? styles.menuItemActive : styles.menuItem}
          onPress={() => setNav('projects')}>
          Projects
        </Text>
        <Text
          style={
            nav === 'communities' ? styles.menuItemActive : styles.menuItem
          }
          onPress={() => setNav('communities')}>
          Communities
        </Text>
        <Text
          style={nav === 'profile' ? styles.menuItemActive : styles.menuItem}
          onPress={() => setNav('profile')}>
          Profile
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
    alignItems: 'flex-start',

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

    borderColor: '#fff4e6',
    borderWidth: 1,
    borderRadius: 10,

    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
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
