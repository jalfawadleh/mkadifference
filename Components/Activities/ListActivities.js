import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function ListActivities({activities, setActivity, delActivity}) {
  return (
    <>
      {activities.map(a => (
        <View style={styles.activity} key={a._id}>
          <Text style={styles.activityName}> {a.name}</Text>
          <View style={styles.buttons}>
            <Button title="Edit" onPress={() => setActivity(a)} />
            <Button title="Delete" onPress={() => delActivity(a._id)} />
          </View>
        </View>
      ))}
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
  activity: {
    height: 80,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    padding: 0,
  },
  activityName: {
    textAlign: 'center',
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 45,
  },

  insertText: {
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 45,
  },
});
