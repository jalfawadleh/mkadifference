/**
 * MKaDifference
 * @format
 */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {Login, Header, Communicate, Search, Manage, Mapbox} from '.';

export default function Main() {
  const [user, setUser] = useState({
    _id: '',
    username: '',
  });

  const [nav, setNav] = useState('');

  axios.defaults.baseURL = 'http://127.0.0.1:3001/api/';
  axios.defaults.headers.common.Authorization = user.token;
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

  return (
    <View style={styles.container}>
      <View style={styles.status} />
      <Header user={user} nav={nav} setNav={setNav} />

      {user.token ? (
        <>
          {nav === 'search' && <Search user={user} />}
          {nav === 'mapbox' && <Mapbox />}
          {nav === 'manage' && <Manage user={user} />}
          {nav === 'communicate' && <Communicate user={user} />}
          {nav === '' && <Text>Home Page</Text>}
        </>
      ) : (
        <Login setUser={setUser} />
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
