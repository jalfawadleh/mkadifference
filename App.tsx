/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';
import Login from './Components/Login';
import Messages from './Components/Messages';
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
      <Header setNav={setNav} user={user} />
      <View style={styles.main}>
        {token ? (
          <>
            {nav === 'search' && <Search user={user} />}
            {nav === 'mapbox' && <Mapbox />}
            {nav === 'manage' && <Manage user={user} />}
            {nav === 'messages' && <Messages user={user} />}
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
    padding: 0,
    margin: 0,
  },
  main: {
    flex: 13,
    padding: 0,
    margin: 0,
    backgroundColor: '#be9b7b',
  },
});
