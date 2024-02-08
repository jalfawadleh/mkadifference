import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
} from 'react-native';
// import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';

import {Styles} from './Common/Styles';

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
    <SafeAreaView style={Styles.container}>
      <ScrollView>
        <View style={styles.inputPanel}>
          <Image
            style={styles.searchIcon}
            source={require('./img/search.png')}
          />
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
            <Image
              style={styles.iconClose}
              source={require('./img/close.png')}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    tintColor: '#dddddd',
    backgroundColor: '#666666',
    borderRadius: 35,
  },
});
