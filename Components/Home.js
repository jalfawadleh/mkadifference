// import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, Image, View, Pressable} from 'react-native';

export default function Home({user, navigation}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <View style={styles.row}>
          <View style={styles.leftUnit}>
            <Image
              style={styles.imageIcon}
              source={require('./img/search.png')}
            />
          </View>
          <View style={styles.rightUnit}>
            <Text style={styles.description}>Search</Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Mapbox')}>
        <View style={styles.row}>
          <View style={styles.leftUnit}>
            <Image
              style={styles.imageIcon}
              source={require('./img/mapbox.png')}
            />
          </View>
          <View style={styles.rightUnit}>
            <Text style={styles.description}>Map</Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Activities')}>
        <View style={styles.row}>
          <View style={styles.leftUnit}>
            <Image
              style={styles.imageIcon}
              source={require('./img/events.png')}
            />
          </View>
          <View style={styles.rightUnit}>
            <Text style={styles.description}>Activities</Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Activities')}>
        <View style={styles.row}>
          <View style={styles.leftUnit}>
            <Image
              style={styles.imageIcon}
              source={require('./img/events.png')}
            />
          </View>
          <View style={styles.rightUnit}>
            <Text style={styles.description}>Messages </Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Activities')}>
        <View style={styles.row}>
          <View style={styles.leftUnit}>
            <Image
              style={styles.imageIcon}
              source={require('./img/events.png')}
            />
          </View>
          <View style={styles.rightUnit}>
            <Text style={styles.description}>Updates </Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Activities')}>
        <View style={styles.row}>
          <View style={styles.leftUnit}>
            <Image
              style={styles.imageIcon}
              source={require('./img/events.png')}
            />
          </View>
          <View style={styles.rightUnit}>
            <Text style={styles.description}>Contacts </Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Profile')}>
        <View style={styles.row}>
          <View style={styles.leftUnit}>
            <Image
              style={styles.imageIcon}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
          </View>
          <View style={styles.rightUnit}>
            <Text style={styles.description}>Profile</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: '#3c2f2f',
  },
  row: {
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#222222',
    height: 120,
  },
  leftUnit: {
    alignContent: 'flex-start',
    justifyContent: 'center',
  },
  rightUnit: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    margin: 10,
    width: 50,
    height: 50,
  },
  description: {
    fontSize: 30,
    color: '#fff4e6',
    alignSelf: 'center',
  },
});
