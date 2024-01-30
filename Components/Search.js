// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, TextInput, Image, View} from 'react-native';

import {Styles} from './Common/Styles';

export default function Search({user}) {
  const [search, setSearch] = useState('');

  return (
    <View style={Styles.container}>
      <View style={Styles.searchBox}>
        <TextInput
          style={Styles.searchInput}
          placeholder="Search"
          placeholderTextColor={Styles.placeholderTextColor}
          onChangeText={setSearch}
          // onEndEditing={setSearch}
          value={search}
          autoCapitalize="none"
        />
        <Image style={Styles.searchIcon} source={require('./img/search.png')} />
      </View>
      <View style={styles.searchLine} />
      <View style={styles.items} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    margin: 0,
    padding: 5,
    backgroundColor: 'brown',
  },

  searchInput: {
    flex: 7,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
    paddingLeft: 5,
    color: '#3c2f2f',
    borderRadius: 45,
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
