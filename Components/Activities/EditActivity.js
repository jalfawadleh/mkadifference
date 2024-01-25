import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function EditActivity({activity, setActivity}) {
  return (
    <>
      <TextInput
        onChangeText={text =>
          setActivity(prevState => ({
            ...prevState,
            name: text,
          }))
        }
        value={activity.name}
        editable
        maxLength={50}
        style={styles.insertText}
      />

      <TextInput
        onChangeText={text =>
          setActivity(prevState => ({
            ...prevState,
            description: text,
          }))
        }
        value={activity.description}
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        style={styles.insertText}
      />
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
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
