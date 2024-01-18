/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView} from 'react-native';
import LoginForm from './Components/LoginForm';
import axios from 'axios';

export default function App(): React.JSX.Element {
  // const [user, setUser] = useState({
  //   _id: '',
  //   name: '',
  //   token: '',
  //   logged: false,
  // });

  axios.defaults.baseURL = 'http://127.0.0.1:3001/api/';
  // axios.defaults.headers.common.Authorization = user.token;
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

  return (
    <SafeAreaView>
      <LoginForm />
    </SafeAreaView>
  );
}
