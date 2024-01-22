// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Image, View} from 'react-native';
export default function Search({user}) {
  //const x = `https://api.multiavatar.com/${probs.user.username}.png`;

  const [search, setSearch] = useState('');

  return (
    <>
      <View style={styles.search}>
        <View style={styles.searchBox}>
          <Image
            style={styles.searchIcon}
            source={require('./img/search.png')}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Type here"
            onChangeText={setSearch}
            // onEndEditing={setSearch}
            value={search}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.searchResults}>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
          <Text style={styles.searchResult}>{user._id}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    height: 100,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 5,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  searchIcon: {
    flex: 1,
    height: 35,
    width: 35,
    color: 'white',
  },
  searchInput: {
    flex: 7,
    fontSize: 25,
    margin: 5,
  },
  searchResults: {
    flex: 15,
    margin: 0,
    padding: 0,
  },
  searchResult: {
    margin: 10,
    padding: 10,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
});
