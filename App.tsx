/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import Login from './Components/Login';
import Communication from './Components/Communication';
import Search from './Components/Search';
import Manage from './Components/Manage';
import Mapbox from './Components/Mapbox';
import Header from './Components/Header';

export default function App(): React.JSX.Element {
  const [user, setUser] = useState({
    _id: '',
    username: '',
  });
  const [token, setToken] = useState('');
  const [nav, setNav] = useState('');

  axios.defaults.baseURL = 'http://127.0.0.1:3001/api/';
  axios.defaults.headers.common.Authorization = token;
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header setNav={setNav} user={user} nav={nav} />
      </View>
      <View style={styles.main}>
        {token ? (
          <>
            {nav === 'search' && <Search user={user} />}
            {nav === 'mapbox' && <Mapbox />}
            {nav === 'manage' && <Manage user={user} />}
            {nav === 'communication' && <Communication user={user} />}
            {nav === '' && <Text>Home Page</Text>}
          </>
        ) : (
          <Login setUser={setUser} setToken={setToken} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 0,
    paddingTop: 15,
    backgroundColor: '#3c2f2f',
  },
  main: {
    flex: 12,
    margin: 0,
    padding: 0,
    backgroundColor: '#be9b7b',
  },
});
