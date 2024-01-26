import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {Styles} from '../Common/Styles';
import CreateStage from './CreateStage';
export default function Stages({activity, setActivity}) {
  const [stage, setStage] = useState([]);
  const delStage = () => {};
  return (
    <>
      <Text style={Styles.title}>Stages</Text>
      {activity.stages.map(s => (
        <View style={Styles.rowInput} key={s.id}>
          <Text style={Styles.title}>{s.name}</Text>
          <View style={Styles.rowButtons}>
            <Button title="Edit" onPress={() => setStage(s)} />
            <Button title="Delete" onPress={() => delStage(s._id)} />
          </View>
        </View>
      ))}

      <CreateStage activity={activity} setActivity={setActivity} />
      <Text>{JSON.stringify(stage)}</Text>
    </>
  );
}
