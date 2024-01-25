import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import EditActivity from './Activities/EditActivity';
// import uuid from 'react-native-uuid';

import axios from 'axios';
import ListActivities from './Activities/ListActivities';

export default function Activities({user}) {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState('');
  const [createNew, setCreateNew] = useState(false);

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

  useEffect(() => {
    getActivities();
  }, [user._id]);

  return (
    <>
      {createNew ? (
        <EditActivity setCreateNew={setCreateNew} activities={activities} />
      ) : activity !== '' ? (
        <EditActivity
          setCreateNew={setCreateNew}
          a={activity}
          setA={setActivity}
          activities={activities}
        />
      ) : (
        <>
          {error && <Text style={styles.error}> {error}</Text>}

          <ListActivities
            activities={activities}
            setActivity={setActivity}
            delActivity={delActivity}
          />
          <Button
            style={styles.button}
            title="Create Activity"
            onPress={() => setCreateNew(true)}
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
