// import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, Image, View, Pressable} from 'react-native';

export default function Home({user, navigation}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <View style={styles.row}>
          <Image
            style={styles.imageIcon}
            source={require('./img/search.png')}
          />
          <Text>Search Events and Members</Text>
        </View>
      </Pressable>

      <View>
        <Pressable onPress={() => navigation.navigate('Mapbox')}>
          <Image
            style={styles.imageIcon}
            source={require('./img/mapbox.png')}
          />
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate('Activities')}>
          <Image
            style={styles.imageIcon}
            source={require('./img/events.png')}
          />
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate('Communicate')}>
          <Image
            style={styles.imageIcon}
            source={{
              uri: `https://api.multiavatar.com/${user.username}.png`,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#3c2f2f',
  },
  imageIcon: {
    width: 100,
    height: 100,
  },
});
