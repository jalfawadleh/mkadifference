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
          placeholderTextColor="#fff4e6"
          onChangeText={setSearch}
          // onEndEditing={setSearch}
          value={search}
          autoCapitalize="none"
        />
        <Image style={styles.searchIcon} source={require('./img/search.png')} />
      </View>
      <View style={styles.searchLine} />
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
  },

  searchInput: {
    flex: 7,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
    paddingLeft: 5,
    color: '#3c2f2f',
  },
  searchIcon: {
    height: 30,
    width: 30,
    margin: 0,
    padding: 0,
  },
  searchLine: {
    height: 1,
    backgroundColor: 'black',
    padding: 0,
    marginBottom: 5,
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
