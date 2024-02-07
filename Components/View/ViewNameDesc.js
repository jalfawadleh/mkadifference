import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Styles} from '../Common/Styles';
export default function ViewNameDesc({element = []}) {
  return (
    <View style={Styles.container}>
      <View style={Styles.box}>
        {element.name && <Text style={styles.caption}>{element.name}</Text>}
        {element.username && (
          <Text style={styles.caption}>{element.username}</Text>
        )}
      </View>
      {element.description && (
        <View style={Styles.box}>
          <Text style={styles.caption}>Description</Text>
          <Text style={styles.description}>{element.description}</Text>
        </View>
      )}
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
  description: {
    color: '#fff4e6',
    margin: 5,
    padding: 5,
    fontSize: 18,
    backgroundColor: '#be9b7b',
  },
});
