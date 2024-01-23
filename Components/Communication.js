// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MenuItems} from '.';
export default function Communication({user}) {
  const [nav, setNav] = useState('');

  return (
    <>
      <MenuItems
        items={['Updates', 'Messages', 'Contacts', 'Profile']}
        nav={nav}
        setNav={setNav}
      />

      <View style={styles.items}>
        <Text style={styles.item}>{nav}</Text>
        <Text style={styles.item}>{user._id}</Text>
        <Text style={styles.item}>{user._id}</Text>
        <Text style={styles.item}>{user._id}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
