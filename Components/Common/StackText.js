import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import uuid from 'react-native-uuid';
import {Styles} from './Styles';

export default function StackText({type, title, items = [], setItem}) {
  const [tag, setTag] = useState('');
  const addTag = () => {
    items.push({name: tag});

    setItem(prevState => ({
      ...prevState,
      [type]: items,
    }));
    setTag('');
  };
  const delTag = n => {
    setItem(prevState => ({
      ...prevState,
      [type]: items.filter(item => item.name !== n),
    }));
  };
  return (
    <View style={Styles.box}>
      <Text style={Styles.title}>{title}</Text>
      <View style={Styles.row}>
        {items ? (
          items.map(t => (
            <View style={Styles.row} key={t._id ? t._id : uuid.v4()}>
              <Text style={Styles.tagName}>{t.name}</Text>
              <Button title="X" onPress={() => delTag(t.name)} />
            </View>
          ))
        ) : (
          <Text style={Styles.note}>No {type} added</Text>
        )}
      </View>
      <View style={Styles.rowInput}>
        <TextInput
          style={Styles.rowInputText}
          value={tag}
          placeholder="Enter New"
          onChangeText={setTag}
          placeholderTextColor="#dddddd"
        />
        <Button
          style={Styles.rowInputButton}
          title="+"
          onPress={() => addTag()}
        />
      </View>
    </View>
  );
}
