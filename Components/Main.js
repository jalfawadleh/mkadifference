/**
 * MKaDifference
 * @format
 */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {Login, Header, Communication, Search, Manage, Mapbox} from '.';

export default function Main() {
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
      <View style={styles.status} />
      <Header setNav={setNav} user={user} nav={nav} />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#be9b7b',
  },
  status: {
    height: 20,
    backgroundColor: '#be9b7b',
  },
});
