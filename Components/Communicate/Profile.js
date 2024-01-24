import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput} from 'react-native';

import uuid from 'react-native-uuid';

import axios from 'axios';

export default function Profile({user}) {
  const [member, setMember] = useState([]);
  const [about, setAbout] = useState('');
  const [hobby, setHobby] = useState('');
  const [help, setHelp] = useState('');

  const [error, setError] = useState('');

  const getMember = async () => {
    const {data} = await axios.get('members/' + user._id);
    setMember(data);
    setAbout(data.about);
  };

  const putMember = async () => {
    const {data} = await axios.put('members/' + member._id, member);
    setMember(data);
  };

  useEffect(() => {
    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  const insertHobby = () => {
    if (hobby === '') {
      setError('Enter a hobby');
      return;
    }

    let c = false;
    if (member.hobbies !== undefined) {
      member.hobbies.map(h => (h.name === hobby ? (c = true) : ''));
    }
    if (!c) {
      const hobbies = member.hobbies === undefined ? [] : member.hobbies;
      hobbies.push({name: hobby});
      setMember(prevState => ({
        ...prevState,
        hobbies,
      }));
      setError('');
      setHobby('');
    } else {
      setError('Hobby already added');
    }
  };

  const insertHelp = () => {
    if (help === '') {
      setError('Enter help needed or offered');
      return;
    }

    let c = false;
    if (member.help !== undefined) {
      member.help.map(h => (h.name === help ? (c = true) : ''));
    }
    if (!c) {
      const helping = member.help === undefined ? [] : member.help;
      helping.push({name: help});
      setMember(prevState => ({
        ...prevState,
        help: helping,
      }));
      setError('');
      setHelp('');
    } else {
      setError('Help already added');
    }
  };

  const updateMember = () => {
    member.about = about;
    putMember();
  };

  return (
    <>
      <Text>About Me</Text>
      <TextInput
        style={styles.insertText}
        onChangeText={setAbout}
        value={about}
      />

      <Text>Interests and Hobbies</Text>
      {member.hobbies &&
        member.hobbies.map(h => (
          <Text key={h.id ? h.id : uuid.v4()}>{h.name}</Text>
        ))}

      <TextInput
        style={styles.insertText}
        placeholder="Enter here"
        placeholderTextColor="#fff4e6"
        onChangeText={setHobby}
        // onEndEditing={handleAvatarChange}
        value={hobby}
      />
      <Button
        title="Insert"
        onPress={() => insertHobby()}
        style={styles.buttonInsert}
      />

      <Text>Help Offered or Needed</Text>
      {member.help &&
        member.help.map(h => (
          <Text key={h.id ? h.id : uuid.v4()}>{h.name}</Text>
        ))}

      <TextInput
        style={styles.insertText}
        placeholder="Enter here"
        placeholderTextColor="#fff4e6"
        onChangeText={setHelp}
        // onEndEditing={handleAvatarChange}
        value={help}
      />

      <Button
        title="Insert"
        onPress={() => insertHelp()}
        style={styles.buttonInsert}
      />

      {error && <Text style={styles.error}> {error}</Text>}

      <Button title="Update" onPress={() => updateMember()} />
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    padding: 5,
    color: 'red',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  insertText: {
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 45,
  },
  buttonInsert: {
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
