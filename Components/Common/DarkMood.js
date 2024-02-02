import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

import {Styles} from './Styles';
export default function DarkMood({element = [], setElement}) {
  return (
    <View style={Styles.box}>
      <Text style={styles.caption}>Dark Mood</Text>
      <View style={Styles.row}>
        <Switch
          trackColor={{false: '#be9b7b', true: '#fff4e6'}}
          thumbColor={element.darkmood ? '#be9b7b' : '#fff4e6'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            setElement(prevState => ({
              ...prevState,
              darkmood: !element.darkmood,
            }))
          }
          value={element.darkmood}
        />
        <Text style={styles.caption}>
          {element.darkmood ? 'Enabled' : 'Disabled'}
        </Text>
      </View>
    </View>
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
