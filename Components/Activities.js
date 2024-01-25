import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

import axios from 'axios';

import {Styles} from './Common/Styles';

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
    setStatus('');
  };

  useEffect(() => {
    getActivities();
  }, [user._id]);

  return (
    <>
      {status === 'editing' || status === 'creating' ? (
        <View style={Styles.box}>
          {error && <Text style={styles.error}> {error}</Text>}
          <TextInput
            style={Styles.textInput}
            placeholder="Name"
            placeholderTextColor="#aaa4e6"
            onChangeText={text =>
              setActivity(prevState => ({
                ...prevState,
                name: text,
              }))
            }
            value={activity.name}
            editable
            maxLength={50}
          />
          <TextInput
            style={Styles.textInput}
            placeholder="Description"
            placeholderTextColor="#aaa4e6"
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
          />
          <View style={Styles.rowButtons}>
            <Button
              style={Styles.button}
              title={
                status === 'creating' ? 'Create Activity' : 'Update Activity'
              }
              onPress={() => onPress()}
            />
            <Button
              style={Styles.button}
              title="Cancel"
              onPress={() => setStatus('')}
            />
          </View>
        </View>
      ) : (
        <>
          {activities.map(a => (
            <View style={Styles.box} key={a._id}>
              <Text style={Styles.title}>{a.name}</Text>
              <View style={Styles.rowButtons}>
                <Button
                  style={Styles.button}
                  title="Edit"
                  onPress={() => {
                    setActivity(a);
                    setStatus('editing');
                  }}
                />
                <Button
                  style={Styles.button}
                  title="Delete"
                  onPress={() => delActivity(a._id)}
                />
              </View>
            </View>
          ))}
          <Button
            style={Styles.button}
            title="Create Activity"
            onPress={() => setStatus('creating')}
          />
        </>
      )}
    </>
  );
}
