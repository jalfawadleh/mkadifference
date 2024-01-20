import axios from 'axios';
import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';

export default function LoginForm(probs: {
  setUser: (arg0: any) => void;
  setToken: (arg0: any) => void;
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
        probs.setUser(data);
      }
    } else {
      // login
      const {data} = await axios.post('users/login', credentials);
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        probs.setUser(data);
        probs.setToken(data.token);
        console.log(data.username + ' - Login Successful');
      }
    }
  };

  const handleAvatarChange = () => {
    setAvatarLink(`https://api.multiavatar.com/${username}.png`);
  };

  return (
    <View style={styles.view}>
      <Text style={styles.logo}>MKaDifference</Text>
      <View style={styles.viewForm}>
        {joinUs && (
          <>
            <Image style={styles.avatar} source={{uri: avatarLink}} />
            <Text style={styles.note}>Username determin the avatar</Text>
          </>
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
      </View>
      {error && <Text style={styles.error}> {error}</Text>}
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
  view: {
    padding: 20,
  },
  logo: {
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
    borderRadius: 45,
  },
  viewLogin: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    margin: 0,
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
