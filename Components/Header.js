import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function Header({user, navigation}) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/search.png')}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Mapbox')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/mapbox.png')}
          />
        </View>
      </Pressable>

      <Text style={styles.headerLogo}>MKaDifference</Text>

      <Pressable onPress={() => navigation.navigate('Activities')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/events.png')}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Communicate')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={{
              uri: `https://api.multiavatar.com/${user.username}.png`,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff4e6',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
