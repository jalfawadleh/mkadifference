import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';

import {Styles} from './Common/Styles';

export default function LoginForm({navigation, setUser}) {
  const [joinUs, setJoinUs] = useState(false);

  // login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //join us
  const [rpassword, setPasswordR] = useState('');
  const [email, setEmail] = useState('');
  const [avatarLink, setAvatarLink] = useState(
    'https://api.multiavatar.com/MKaDifference.png',
  );

  const credentials = {username, password, rpassword, email};

  const [error, setError] = useState('');

  const onPress = async () => {
    setError('');

    // checking username and password
    if (!username) {
      setError('Enter Username');
      return;
    }
    if (username.length < 8) {
      setError('Username must be at least 8 characters');
      return;
    }

    if (!password) {
      setError('Enter Password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // if login or join
    if (joinUs) {
      if (password !== rpassword) {
        setError('Passwords do not match');
        return;
      }
      if (!email) {
        setError('Please Enter Email');
        return;
      }

      // Create a New account
      const {data} = await axios.post('users/', credentials);
      if (data.error) {
        setError(data.error);
      } else {
        data.token = 'Bearer ' + data.token;
        setUser(data);
      }
    } else {
      // login
      const {data} = await axios.post('users/login', credentials);
      if (data.error) {
        setError(data.error);
      } else {
        data.token = 'Bearer ' + data.token;
        setUser(data);
        console.log(' Login Successful : ' + data.username);
        navigation.navigate('Home');
      }
    }
  };

  const handleAvatarChange = () => {
    setAvatarLink(`https://api.multiavatar.com/${username}.png`);
  };

  return (
    <View style={Styles.container}>
      <Image style={Styles.avatar} source={{uri: avatarLink}} />

      {joinUs && <Text style={Styles.note}>Username determin the avatar</Text>}

      <TextInput
        style={Styles.input}
        autoComplete="username"
        placeholder="Username"
        onChangeText={setUsername}
        onEndEditing={handleAvatarChange}
        value={username}
        autoCapitalize="none"
        placeholderTextColor={Styles.placeholderTextColor}
      />

      <TextInput
        style={Styles.input}
        onChangeText={setPassword}
        value={password}
        autoComplete="password"
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={Styles.placeholderTextColor}
      />
      {joinUs && (
        <>
          <TextInput
            style={Styles.input}
            onChangeText={setPasswordR}
            value={rpassword}
            placeholder="Confirm Password"
            placeholderTextColor={Styles.placeholderTextColor}
            secureTextEntry
          />
          <TextInput
            style={Styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor={Styles.placeholderTextColor}
            autoComplete="email"
          />
          <Text style={Styles.note}>
            Email will only be used to reset the password
          </Text>
        </>
      )}
      {error && <Text style={Styles.error}> {error}</Text>}
      <View style={styles.viewLogin}>
        <View style={styles.viewButton}>
          <Button title={joinUs ? 'Join US' : 'Login'} onPress={onPress} />
        </View>
        <View style={styles.viewButton}>
          <Button color="black" title="OR" />
        </View>
        <View style={styles.viewButton}>
          <Button
            title={joinUs ? 'Login' : 'Join US'}
            onPress={() => setJoinUs(!joinUs)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewLogin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 0,
    paddingTop: 5,
  },
  viewButton: {
    height: 50,
  },
  loginB: {
    margin: 5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 45,
  },
});
