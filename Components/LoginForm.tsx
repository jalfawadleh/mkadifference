import axios from 'axios';
import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';

export default function LoginForm(probs: {
  setUser: (arg0: any) => void;
}): React.JSX.Element {
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

  const userData = {username, password, rpassword, email};

  const [error, setError] = useState('');

  const handleLogin = async () => {
    const {data} = await axios.post('users/login', userData);
    if (data.error) {
      console.log(data.error);
    } else {
      data.token = 'Bearer ' + data.token;
      probs.setUser(data);
      console.log(data);
    }
  };

  const handleJoinUs = async () => {
    // New account
    if (password !== rpassword) {
      setError('Passwords do not match');
    } else if (email === '') {
      setError('Please Enter Email');
    } else {
      // Create a New account
      const {data} = await axios.post('users/', userData);
      if (data.error) {
        setError(data.error);
      } else {
        data.token = 'Bearer ' + data.token;
        probs.setUser(data);
      }
    }

    setJoinUs(!joinUs);
  };

  const handleAvatarChange = () => {
    setAvatarLink(`https://api.multiavatar.com/${username}.png`);
  };

  return (
    <View style={styles.view}>
      <Text style={styles.header}>MKaDifference</Text>
      <Text> {error}</Text>
      {joinUs && (
        <Image
          style={styles.avatar}
          source={{
            uri: avatarLink,
          }}
        />
      )}
      <TextInput
        style={styles.input}
        autoComplete="username"
        placeholder="Username"
        onChangeText={setUsername}
        onEndEditing={handleAvatarChange}
        value={username}
        autoCapitalize="none"
      />
      {joinUs && (
        <Text style={styles.note}>Username will decide the avatar</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        autoComplete="password"
        placeholder="Password"
        secureTextEntry
      />
      {joinUs && (
        <>
          <TextInput
            style={styles.input}
            onChangeText={setPasswordR}
            value={rpassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoComplete="email"
          />
          <Text style={styles.note}>
            Email will only be used to reset the password
          </Text>
        </>
      )}
      {!joinUs && <Button title="Login" onPress={handleLogin} />}
      <Button title="Join US" onPress={handleJoinUs} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  header: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
  },
  avatar: {
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  input: {
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 45,
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
