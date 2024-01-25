import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput} from 'react-native';

// import uuid from 'react-native-uuid';

import axios from 'axios';

export default function Projects({user}) {
  const [error, setError] = useState('');
  const [member, setMember] = useState('');

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

      {error && <Text style={styles.error}> {error}</Text>}

      <Button title="Update" onPress={() => getMember()} />
      <Button title="Update" onPress={() => setError('')} />
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
