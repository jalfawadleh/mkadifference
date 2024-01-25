import axios from 'axios';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput} from 'react-native';

// import uuid from 'react-native-uuid';

export default function EditActivity({a = [], setCreateNew, activities}) {
  const [error, setError] = useState('');

  const [activity, setActivity] = useState(a);

  const postActivity = async () => {
    const {data} = await axios.post('activities/', activity);
    if (data.error) {
      setError(data.error);
    } else {
      activities.push(data);
    }
    setCreateNew(false);
  };

  const putActivity = async () => {
    const {data} = await axios.post('activities/', activity);
    if (data.error) {
      setError(data.error);
    } else {
      setActivities(data);
    }
  };

  return (
    <>
      <TextInput
        onChangeText={text =>
          setActivity(prevState => ({
            ...prevState,
            name: text,
          }))
        }
        value={activity.name}
        editable
        maxLength={50}
        style={styles.insertText}
      />

      <TextInput
        onChangeText={text =>
          setActivity(prevState => ({
            ...prevState,
            description: text,
          }))
        }
        value={activity.description}
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        style={styles.insertText}
      />

      {error && <Text style={styles.error}> {error}</Text>}

      <Button
        style={styles.button}
        title={(activity._id ? 'Update' : 'Create') + ' Activity'}
        onPress={() => (activity._id ? putActivity() : postActivity())}
      />
      <Button title="Cancel" onPress={() => setCreateNew(false)} />
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
});
