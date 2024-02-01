import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {Styles} from './Styles';
export default function EditNameDesc({element = [], setElement}) {
  return (
    <>
      <View style={Styles.box}>
        <Text style={styles.caption}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          placeholderTextColor="#333333"
          onChangeText={text =>
            setElement(prevState => ({
              ...prevState,
              name: text,
            }))
          }
          value={element.name}
          editable
          maxLength={50}
        />
      </View>
      <View style={Styles.box}>
        <Text style={styles.caption}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          placeholderTextColor="#333333"
          onChangeText={text =>
            setElement(prevState => ({
              ...prevState,
              description: text,
            }))
          }
          value={element.description}
          editable
          maxLength={240}
          multiline
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  caption: {
    padding: 5,
    color: '#fff4e6',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    color: '#fff4e6',
    margin: 5,
    padding: 5,
    fontSize: 18,
    backgroundColor: '#be9b7b',
  },
});
