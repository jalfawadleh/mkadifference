import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';
import uuid from 'react-native-uuid';

import {Styles} from '../Common/Styles';

export default function EditActivity({route, navigation}) {
  const focused = useIsFocused();
  const [activity, setActivity] = useState([]);
  const [stage, setStage] = useState([]);
  const [error, setError] = useState('');

  const getActivity = async () => {
    const {data} = await axios.get('activities/' + route.params.activityId);
    if (data.error) {
      setError(data.error);
    } else {
      setActivity(data);
    }
  };

  const putActivity = async () => {
    const {data} = await axios.put(
      'activities/' + route.params.activityId,
      activity,
    );
    if (data.error) {
      setError(data.error);
    } else {
      setActivity(data);
    }
  };

  const addStage = () => {
    activity.stages.push(stage);
    putActivity();
  };

  const delStage = s => {
    const temp = activity.stages.filter(st => st._id !== s._id);
    setActivity(prevState => ({...prevState, stages: temp}));
  };

  const updateActivity = () => {
    putActivity();
    navigation.navigate('Activities');
  };

  useEffect(() => {
    if (focused) {
      getActivity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>{activity.name}</Text>

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
          setActivity(prevState => ({...prevState, description: text}))
        }
        value={activity.description}
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
      />

      {activity.stages &&
        activity.stages.map(s => (
          <View style={Styles.rowInput} key={s._id}>
            <Text style={Styles.title}>{s.name}</Text>
            <View style={Styles.rowButtons}>
              <Button title="Edit" onPress={() => setStage(s)} />
              <Button title="Delete" onPress={() => delStage(s)} />
            </View>
          </View>
        ))}

      <View style={Styles.box}>
        <View style={Styles.rowInput}>
          <TextInput
            style={Styles.rowInputText}
            value={stage.name}
            placeholder="Stage Name"
            onChangeText={text => setStage({name: text})}
            placeholderTextColor={Styles.placeholderTextColor}
          />
          <Button
            style={Styles.rowInputButton}
            title="+"
            onPress={() => addStage()}
          />
        </View>
      </View>

      <View style={Styles.rowButtons}>
        <Button
          style={Styles.button}
          title="Update Activity"
          onPress={() => updateActivity()}
        />
        <Button
          style={Styles.button}
          title="Back"
          onPress={() => navigation.navigate('Activities')}
        />
      </View>
    </View>
  );
}
