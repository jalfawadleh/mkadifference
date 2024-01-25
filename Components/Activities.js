import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

import axios from 'axios';

export default function Activities({user}) {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState('');
  const [status, setStatus] = useState('');

  const [error, setError] = useState('');

  const getActivities = async () => {
    const {data} = await axios.get('activities/');
    setActivities(data);
  };

  const delActivity = async id => {
    const {data} = await axios.delete('activities/' + id);
    if (data.error) {
      setError(data.error);
    }
    setActivities(data);
  };

  const postActivity = async () => {
    const {data} = await axios.post('activities/', activity);
    if (data.error) {
      setError(data.error);
    } else {
      activities.push(data);
    }
  };

  const putActivity = async () => {
    const {data} = await axios.put('activities/' + activity._id, activity);
    if (data.error) {
      setError(data.error);
    } else {
      getActivities();
    }
  };

  const onPress = () => {
    if (status === 'creating') {
      postActivity();
    } else {
      putActivity();
    }
  };

  useEffect(() => {
    getActivities();
  }, [user._id]);

  return (
    <>
      {status === 'editing' || status === 'creating' ? (
        <>
          {error && <Text style={styles.error}> {error}</Text>}
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
          <Button
            style={styles.button}
            title={
              status === 'creating' ? 'Create Activity' : 'Update Activity'
            }
            onPress={() => onPress()}
          />
          <Button
            style={styles.button}
            title="Cancel"
            onPress={() => setStatus('')}
          />
        </>
      ) : (
        <>
          {activities.map(a => (
            <View style={styles.activity} key={a._id}>
              <Text style={styles.activityName}> {a.name}</Text>
              <View style={styles.buttons}>
                <Button
                  title="Edit"
                  onPress={() => {
                    setActivity(a);
                    setStatus('editing');
                  }}
                />
                <Button title="Delete" onPress={() => delActivity(a._id)} />
              </View>
            </View>
          ))}
          <Button
            style={styles.button}
            title="Create Activity"
            onPress={() => setStatus('creating')}
          />
        </>
      )}
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

  button: {
    margin: 5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 45,
  },
});
