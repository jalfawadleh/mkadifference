import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import axios from 'axios';

import {Styles} from './Common/Styles';

export default function Activities({user}) {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState([{_id: 0, name: ''}]);

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
      setActivity([{_id: 0, name: ''}]);
      getActivities();
    }
  };

  const putActivity = async () => {
    const {data} = await axios.put('activities/' + activity._id, activity);
    if (data.error) {
      setError(data.error);
    } else {
      setActivity([{_id: 0, name: ''}]);
      getActivities();
    }
  };

  useEffect(() => {
    getActivities();
  }, [user._id]);

  return (
    // edit activity
    <>
      {activity._id ? (
        <View style={Styles.box}>
          {error && <Text style={Styles.error}> {error}</Text>}
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
              title="Update Activity"
              onPress={() => putActivity()}
            />
            <Button
              style={Styles.button}
              title="Cancel"
              onPress={() => setActivity([{_id: 0, name: ''}])}
            />
          </View>
        </View>
      ) : (
        // show activities
        <>
          {activities.map(a => (
            <View style={Styles.box} key={a._id}>
              <Text style={Styles.title}>{a.name}</Text>
              <View style={Styles.rowButtons}>
                <Button
                  title="Edit"
                  onPress={() => {
                    setActivity(a);
                  }}
                />
                <Button title="Delete" onPress={() => delActivity(a._id)} />
              </View>
            </View>
          ))}
          <View style={Styles.box}>
            <View style={Styles.rowInput}>
              <TextInput
                style={Styles.rowInputText}
                value={activity.name}
                placeholder="Activity Name"
                onChangeText={text =>
                  setActivity(prevState => ({
                    ...prevState,
                    name: text,
                  }))
                }
                placeholderTextColor="#dddddd"
              />
              <Button
                style={Styles.rowInputButton}
                title="+"
                onPress={() => postActivity()}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
}
