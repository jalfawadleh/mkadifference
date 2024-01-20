/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import LoginForm from './Components/Login';
import Home from './Components/Home';
import axios from 'axios';

export default function App(): React.JSX.Element {
  const [user, setUser] = useState({
    _id: '',
    username: '',
  });
  const [token, setToken] = useState('');

  axios.defaults.baseURL = 'http://127.0.0.1:3001/api/';
  axios.defaults.headers.common.Authorization = token;
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

  return token ? (
    <Home user={user} />
  ) : (
    <LoginForm setUser={setUser} setToken={setToken} />
  );
}
