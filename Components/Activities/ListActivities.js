import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

// import uuid from 'react-native-uuid';

export default function ListActivities({activities, setActivity, delActivity}) {
  return (
    <>
      {activities.map(a => (
        <View key={a._id}>
          <Text>Name: {a.name}</Text>
          <Text>Description: {a.description}</Text>
          <Button title="Edit" onPress={() => setActivity(a)} />
          <Button title="Delete" onPress={() => delActivity(a._id)} />
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
  button: {
    margin: 5,
    padding: 5,
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
