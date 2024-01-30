import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

import {Styles} from './Common/Styles';

export default function Activities({navigation}) {
  const focused = useIsFocused();

  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState([{_id: 0, name: '', stages: []}]);

  const [error, setError] = useState('');

  const getActivities = async () => {
    const {data} = await axios.get('activities/');
    setActivities(data);
  };

  const postActivity = async () => {
    const {data} = await axios.post('activities/', activity);
    if (data.error) {
      setError(data.error);
    } else {
      getActivities();
      setActivity([{_id: 0, name: '', stages: []}]);
    }
  };

  useEffect(() => {
    if (focused) {
      getActivities();
    }
  }, [focused]);

  return (
    <View style={Styles.container}>
      {error && <Text style={Styles.error}> {error}</Text>}
      {/* list Activities */}
      {activities.map(a => (
        <View style={Styles.box} key={a._id}>
          <Text style={Styles.title}>{a.name}</Text>
          <View style={Styles.rowButtons}>
            <Button
              title="View"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('ViewActivity', {activity: a});
              }}
            />
            <Button
              title="Edit"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('EditActivity', {activityId: a._id});
              }}
            />
          </View>
        </View>
      ))}

      {/* create activity */}
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
    </View>
  );
}
