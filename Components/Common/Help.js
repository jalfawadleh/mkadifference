import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import uuid from 'react-native-uuid';
import {Styles} from './Styles';

export default function Help({type, item, setItem}) {
  const [tag, setTag] = useState([]);
  const addTag = () => {
    const tags = item.tags ? item.tags : [];
    tags.push({name: tag});

    setItem(prevState => ({
      ...prevState,
      [type]: tags,
    }));
  };
  const delTag = () => {};
  return (
    <View style={Styles.box}>
      <Text style={Styles.title}>Tags</Text>
      <View style={Styles.row}>
        {item.tags ? (
          item.tags.map(t => (
            <View style={Styles.row}>
              <Text style={Styles.tagName} key={uuid.v4()}>
                {t.name}
              </Text>
              <Button title="X" onPress={() => delTag(item.name)} />
            </View>
          ))
        ) : (
          <Text style={Styles.note}>No tags added</Text>
        )}
      </View>
      <TextInput
        style={Styles.textInput}
        value={tag}
        placeholder="Enter Tag"
        onChangeText={setTag}
        placeholderTextColor="#dddddd"
      />
      <Button title="Add" onPress={() => addTag(item.name)} />
    </View>
  );
}
