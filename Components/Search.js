import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
} from 'react-native';
// import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';

export default function Search({navigation}) {
  // const focused = useIsFocused();
  // const [activity, setActivity] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // const [error, setError] = useState('');

  // const getActivity = async () => {
  //   const {data} = await axios.get(
  //     'activities/' + (id !== '' ? id : route.params.id),
  //   );
  //   if (data.error) {
  //     setError(data.error);
  //   } else {
  //     setActivity(data);
  //   }
  // };

  // useEffect(() => {
  //   if (focused) {
  //     getActivity();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [focused]);

  // const results = searchText !== '' && (
  //   <View style={styles.searchResults}>
  //     <ScrollView>
  //       {searchResults.map(item => (
  //         <Pressable
  //           key={item._id}
  //           onPress={() =>
  //             setModalcontent(
  //               item.type === 'member' ? (
  //                 <ViewMember id={item._id} />
  //               ) : (
  //                 <ViewActivity id={item._id} />
  //               ),
  //             )
  //           }>
  //           <Text style={styles.resultsTitle}>{item.name}</Text>
  //         </Pressable>
  //       ))}
  //     </ScrollView>
  //   </View>
  // );

  const getSearchResults = async () => {
    const {data} = await axios.get('search/' + searchText);
    setSearchResults(data);
  };

  useEffect(() => {
    if (searchText.length > 3) {
      getSearchResults();
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputPanel}>
        <Image style={styles.searchIcon} source={require('./img/search.png')} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={styles.placeholderTextColor}
          onChangeText={setSearchText}
          // onEndEditing={setSearch}
          value={searchText}
          autoCapitalize="none"
        />
        <Pressable onPress={() => setSearchText('')}>
          <Image style={styles.iconClose} source={require('./img/close.png')} />
        </Pressable>
      </View>
      <View style={styles.results}>
        {searchResults.length > 0 ? (
          searchResults.map(item => (
            <View style={styles.result} key={item._id}>
              <Pressable
                onPress={() =>
                  navigation.navigate(
                    item.type === 'activity' ? 'ViewActivity' : 'ViewMember',
                    {id: item._id},
                  )
                }>
                <Text style={styles.resultName}>
                  {item.type === 'activity' ? item.name : item.username}
                </Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.result}>
            <Text style={styles.resultName}>Nothing found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: '#111111',
  },
  inputPanel: {
    margin: 0,
    padding: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchIcon: {
    marginTop: 5,
    marginLeft: 10,
    padding: 0,

    height: 30,
    width: 30,

    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: -35,
    paddingRight: 5,
    paddingLeft: 35,

    height: 40,

    fontSize: 20,
    fontWeight: 'bold',

    color: 'white',
    backgroundColor: '#111111',

    borderColor: '#bbbbbb',
    borderWidth: 2,
    borderRadius: 15,
  },
  iconClose: {
    height: 28,
    width: 28,
    marginTop: 6,
    marginLeft: -35,
    marginRight: 5,
    tintColor: '#ffffff',
    backgroundColor: '#666666',
    borderRadius: 35,
  },

  results: {
    margin: 5,
  },
  result: {
    margin: 5,
    padding: 5,
  },
  resultName: {
    width: '100%',
    fontSize: 20,
    color: '#dddddd',
  },
});
