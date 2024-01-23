// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Image, View} from 'react-native';
export default function Search({user}) {
  //const x = `https://api.multiavatar.com/${probs.user.username}.png`;

  const [search, setSearch] = useState('');

  return (
    <>
      <View style={styles.menu}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type here"
          onChangeText={setSearch}
          // onEndEditing={setSearch}
          value={search}
          autoCapitalize="none"
        />
        <Image style={styles.searchIcon} source={require('./img/search.png')} />
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
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
  },

  searchInput: {
    flex: 7,
    fontSize: 20,
    padding: 5,
  },
  searchIcon: {
    height: 35,
    width: 35,
    margin: 0,
    padding: 0,
  },

  items: {
    flex: 16,
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
