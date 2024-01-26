import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import axios from 'axios';

import {Styles} from './Common/Styles';
import ListActivities from './Activities/ListActivities';
import CreateActivity from './Activities/CreateActivity';
import EditActivity from './Activities/EditActivity';

export default function Activities({user}) {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState([{_id: 0, name: '', stages: []}]);

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
      setActivity([{_id: 0, name: '', stages: []}]);
      getActivities();
    }
  };

  const putActivity = async () => {
    const {data} = await axios.put('activities/' + activity._id, activity);
    if (data.error) {
      setError(data.error);
    } else {
      setActivity([{_id: 0, name: '', stages: []}]);
      getActivities();
    }
  };

  useEffect(() => {
    getActivities();
  }, [user._id]);

  return (
    // edit activity
    <>
      {error && <Text style={Styles.error}> {error}</Text>}

      {activity._id ? (
        <EditActivity
          activity={activity}
          setActivity={setActivity}
          putActivity={putActivity}
        />
      ) : (
        <>
          <ListActivities
            activities={activities}
            setActivity={setActivity}
            delActivity={delActivity}
          />
          <CreateActivity
            activity={activity}
            setActivity={setActivity}
            postActivity={postActivity}
          />
        </>
      )}
    </>
  );
}
