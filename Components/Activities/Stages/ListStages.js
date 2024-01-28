import React from 'react';
import {Button, Text, View} from 'react-native';

import uuid from 'react-native-uuid';

import {Styles} from '../../Common/Styles';
export default function ListStages({activity, setStage, delStage}) {
  return (
    <>
      {activity.stages.map(s => (
        <View style={Styles.rowInput} key={s._id ? s._id : uuid.v4()}>
          <Text style={Styles.title}>{s.name}</Text>
          <View style={Styles.rowButtons}>
            <Button title="Edit" onPress={() => setStage(s)} />
            <Button title="Delete" onPress={() => delStage(s._id)} />
          </View>
        </View>
      ))}
    </>
  );
}
