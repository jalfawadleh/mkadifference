import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';

import {Styles} from './Common/Styles';

export default function LoginForm({navigation, setUser}) {
  const [joinUs, setJoinUs] = useState(false);

  // login
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');

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
    <View style={styles.container}>
      <Text style={styles.logo}>MKaDifference</Text>
      <View style={styles.avatar}>
        <Image style={styles.avatarImage} source={{uri: avatarLink}} />
      </View>

      {joinUs && <Text style={Styles.note}>Username determin the avatar</Text>}
      <View style={styles.inputform}>
        <TextInput
          style={styles.input}
          autoComplete="username"
          placeholder="Username"
          onChangeText={setUsername}
          onEndEditing={handleAvatarChange}
          value={username}
          autoCapitalize="none"
          placeholderTextColor={Styles.placeholderTextColor}
        />

        <TextInput
          style={styles.input}
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
              style={styles.input}
              onChangeText={setPasswordR}
              value={rpassword}
              placeholder="Confirm Password"
              placeholderTextColor={Styles.placeholderTextColor}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
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
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#161618',
    alignContent: 'space-around',
  },
  logo: {
    marginTop: 60,
    color: '#fff4e6',
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },

  avatarImage: {
    marginTop: 25,
    marginBottom: 25,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  viewLogin: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 25,
    paddingTop: 5,
  },
  input: {
    margin: 10,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 15,
    backgroundColor: '#212124',
    color: 'white',
  },

  viewButton: {
    height: 50,
  },
  loginB: {
    margin: 5,
    padding: 5,
    borderColor: 'black',
    backgroundColor: '#818181',
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 45,
  },
});
