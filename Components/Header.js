import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function Header({setNav, user, nav}) {
  return (
    <View style={styles.header}>
      {user._id && (
        <>
          <Pressable onPress={() => setNav('search')}>
            <View
              style={
                nav === 'search'
                  ? styles.headerElementActive
                  : styles.headerElement
              }>
              <Image
                style={styles.headerIcon}
                source={require('./img/search.png')}
              />
            </View>
          </Pressable>
          <Pressable onPress={() => setNav('mapbox')}>
            <View
              style={
                nav === 'mapbox'
                  ? styles.headerElementActive
                  : styles.headerElement
              }>
              <Image
                style={styles.headerIcon}
                source={require('./img/mapbox.png')}
              />
            </View>
          </Pressable>
        </>
      )}

      <Text onPress={() => setNav('')} style={styles.headerLogo}>
        MKaDifference
      </Text>

      {user._id && (
        <>
          <Pressable onPress={() => setNav('manage')}>
            <View
              style={
                nav === 'manage'
                  ? styles.headerElementActive
                  : styles.headerElement
              }>
              <Image
                style={styles.headerIcon}
                source={require('./img/manage.png')}
              />
            </View>
          </Pressable>
          <Pressable onPress={() => setNav('communication')}>
            <View
              style={
                nav === 'communication'
                  ? styles.headerElementActive
                  : styles.headerElement
              }>
              <Image
                style={styles.headerIcon}
                source={{
                  uri: `https://api.multiavatar.com/${user.username}.png`,
                }}
              />
            </View>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 0,
    paddingTop: 10,
    backgroundColor: '#3c2f2f',
  },
  headerElement: {
    height: 40,
    width: 40,
  },
  headerElementActive: {
    height: 40,
    width: 40,
    backgroundColor: '#be9b7b',
  },

  headerIcon: {
    height: 35,
    width: 35,

    alignSelf: 'center',
  },
  headerLogo: {
    height: 40,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff4e6',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
