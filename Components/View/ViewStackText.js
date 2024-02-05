import React from 'react';
import {Text, View} from 'react-native';
import {Styles} from '../Common/Styles';

export default function ViewStackText({title, items = []}) {
  return (
    <View style={Styles.box}>
      <Text style={Styles.title}>{title}</Text>
      <View style={Styles.row}>
        {items.map(t => (
          <View style={Styles.row} key={t._id}>
            <Text style={Styles.tagName}>{t.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
