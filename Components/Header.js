import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function Header({setNav, user, nav}) {
  return (
    <>
      <Pressable onPress={() => setNav('search')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/search.png')}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => setNav('mapbox')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/mapbox.png')}
          />
        </View>
      </Pressable>
      <Text style={styles.headerLogo}>MKaDifference</Text>

      <Pressable onPress={() => setNav('manage')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/manage.png')}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => setNav('communication')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={{uri: `https://api.multiavatar.com/${user.username}.png`}}
          />
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  headerElement: {
    flex: 1,
    margin: 5,
    padding: 0,
    height: 40,
    width: 40,
    color: 'white',
  },
  headerIcon: {
    height: 35,
    width: 35,
    alignSelf: 'center',
  },
  headerLogo: {
    padding: 4,
    height: 40,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
