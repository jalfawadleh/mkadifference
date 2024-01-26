import React from 'react';
import {Button, Text, View} from 'react-native';
import {Styles} from '../Common/Styles';
export default function ListActivities({activities, setActivity, delActivity}) {
  return (
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
    </>
  );
}
