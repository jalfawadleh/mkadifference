import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import {Styles} from '../../Common/Styles';
import Stages from './Stages';

export default function ViewActivity({activity, setActivity, putActivity}) {
  const newActivity = [{_id: 0, name: '', stages: []}];
  return (
    <>
      <View style={Styles.box}>
        <Text>{activity.name}</Text>
        <Text>{activity.description}</Text>
        <Stages
          activity={activity}
          setActivity={setActivity}
          putActivity={putActivity}
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
            onPress={() => setActivity(newActivity)}
          />
        </View>
      </View>
    </>
  );
}
