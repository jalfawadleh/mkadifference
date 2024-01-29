// import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, Image, View, Pressable} from 'react-native';

export default function Home({user, navigation}) {
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate('Search')}>
          <View style={styles.col}>
            <Image
              style={styles.imageIcon}
              source={require('./img/search.png')}
            />
            <Text style={styles.description}>Search</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Mapbox')}>
          <View style={styles.col}>
            <Image
              style={styles.imageIcon}
              source={require('./img/mapbox.png')}
            />
            <Text style={styles.description}>Map</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate('Activities')}>
          <View style={styles.col}>
            <Image
              style={styles.imageIcon}
              source={require('./img/events.png')}
            />
            <Text style={styles.description}>Activities</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Communicate')}>
          <View style={styles.col}>
            <Image
              style={styles.imageIcon}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
            <Text style={styles.description}>Communicate</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'black',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
  },
  imageIcon: {
    margin: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  description: {
    fontSize: 30,
    color: '#fff4e6',
    textAlign: 'center',
  },
});
