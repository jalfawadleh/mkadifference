import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function MenuItems({items, nav, setNav}) {
  return (
    <View style={styles.menu}>
      {items.map(item => (
        <Text
          style={nav === item ? styles.menuItemActive : styles.menuItem}
          onPress={() => setNav(item)}>
          {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,

    justifyContent: 'space-around',

    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
  },
  menuItemActive: {
    fontSize: 18,
    padding: 10,
    color: '#fff4e6',
  },
});
