import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput} from 'react-native';

import axios from 'axios';

export default function Account({user}) {
  const [member, setMember] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [email, setEmail] = useState('');

  // stores the error statement in case any
  const [error, setError] = useState('');

  // If user logged in request details
  const getMember = async () => {
    const {data} = await axios.get('members/' + user._id);
    setMember(data);
  };

  useEffect(() => {
    if (user._id) {
      getMember();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  const updateUser = async () => {
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
  };

  return (
    <>
      {<Text style={styles.error}> {JSON.stringify(member)}</Text>}

      <Image
        style={styles.avatar}
        source={{uri: `https://api.multiavatar.com/${username}.png`}}
      />

      <Text style={styles.note}>Username determin the avatar</Text>

      <TextInput
        style={styles.input}
        autoComplete="username"
        placeholder="Username"
        placeholderTextColor="#fff4e6"
        onChangeText={setUsername}
        // onEndEditing={handleAvatarChange}
        value={username}
        autoCapitalize="characters"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        autoComplete="password"
        placeholder="Password"
        placeholderTextColor="#fff4e6"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        onChangeText={setRpassword}
        value={rpassword}
        placeholder="Confirm Password"
        placeholderTextColor="#fff4e6"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="#fff4e6"
        autoComplete="email"
      />
      <Text style={styles.note}>
        Email will only be used to reset the password
      </Text>

      {error && <Text style={styles.error}> {error}</Text>}

      <Button title="Update" onPress={() => updateUser()} />
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  error: {
    padding: 5,
    color: 'red',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewForm: {
    margin: 0,
    padding: 0,
  },
  input: {
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 45,
  },
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
  note: {
    alignSelf: 'center',
  },
});
