import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text} from 'react-native';

import EditActivity from './Activities/EditActivity';
// import uuid from 'react-native-uuid';

import axios from 'axios';

export default function Activities({user}) {
  const [activities, setActivities] = useState([]);

  const [activityId, setActivityId] = useState(-1);

  const getActivities = async () => {
    const {data} = await axios.get('activities/');
    setActivities(data);
  };

  useEffect(() => {
    getActivities();
  }, [user._id]);

  return (
    <>
      <Text>Activities</Text>

      {activityId > -1 ? (
        <EditActivity
          activityId={activityId}
          setActivityId={setActivityId}
          activities={activities}
        />
      ) : (
        <>
          <Text>Activities: {JSON.stringify(activities)}</Text>
          <Button
            style={styles.button}
            title="Create Activity"
            onPress={() => setActivityId(0)}
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
