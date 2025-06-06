import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

import {Styles} from './Common/Styles';
import {ViewActivity} from '.';

export default function Activities({navigation, SetModalContent}) {
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
      <FlatList
        data={activities}
        renderItem={({item}) => (
          <View style={Styles.box} key={item._id}>
            <Text style={Styles.title}>{item.name}</Text>
            <View style={Styles.rowButtons}>
              <Button
                title="View"
                onPress={() => {
                  navigation.navigate('ViewActivity', {id: item._id});
                }}
              />
              <Button
                title="Edit"
                onPress={() => {
                  navigation.navigate('EditActivity', {id: item._id});
                }}
              />
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
      />
      {/* create activity */}
      {error && <Text style={Styles.error}> {error}</Text>}
      <View style={Styles.box}>
        <View style={Styles.rowInput}>
          <TextInput
            style={Styles.rowInputText}
            value={activity.name}
            placeholder="Activity Name"
            onChangeText={text =>
              setActivity(prevState => ({...prevState, name: text}))
            }
            placeholderTextColor={Styles.placeholderTextColor}
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
