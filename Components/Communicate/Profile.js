import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput} from 'react-native';

import uuid from 'react-native-uuid';

import axios from 'axios';

export default function Profile({user}) {
  const [error, setError] = useState('');

  const [member, setMember] = useState([]);
  const [hobby, setHobby] = useState('');
  const [help, setHelp] = useState('');

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

  const updateDescription = text => {
    setMember(prevState => ({
      ...prevState,
      description: text,
    }));
  };

  const getMember = async () => {
    const {data} = await axios.get('members/' + user._id);
    setMember(data);
  };

  const putMember = async () => {
    const {data} = await axios.put('members/' + member._id, member);
    setMember(data);
  };

  useEffect(() => {
    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  return (
    <>
      <Text>About Me</Text>
      <TextInput
        onChangeText={text => updateDescription(text)}
        value={member.description}
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        style={styles.insertText}
      />

      <Text>Tags: Interests and Hobbies</Text>
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

      <Button title="Update" onPress={() => putMember()} />
      <Text>{JSON.stringify(member.description)}</Text>
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
