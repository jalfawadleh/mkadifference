// import axios from 'axios';
import React from 'react';
import {Text, Image, View, Pressable} from 'react-native';

import {Styles} from './Common/Styles';

export default function Home({user, navigation}) {
  return (
    <View style={Styles.homeContainer}>
      <View style={Styles.homeRow}>
        <View style={Styles.homeCol}>
          <Pressable
            style={Styles.homeLink}
            onPress={() => navigation.navigate('Search')}>
            <Image
              style={Styles.homeLinkIcon}
              source={require('./img/search.png')}
            />
            <Text style={Styles.homeLinkTitle}>Search</Text>
          </Pressable>
        </View>
        <View style={Styles.homeCol}>
          <Pressable
            style={Styles.homeLink}
            onPress={() => navigation.navigate('Mapbox')}>
            <Image
              style={Styles.homeLinkIcon}
              source={require('./img/mapbox.png')}
            />
            <Text style={Styles.homeLinkTitle}>Map</Text>
          </Pressable>
        </View>
      </View>
      <View style={Styles.homeRow}>
        <View style={Styles.homeCol}>
          <Pressable
            style={Styles.homeLink}
            onPress={() => navigation.navigate('Activities')}>
            <Image
              style={Styles.homeLinkIcon}
              source={require('./img/events.png')}
            />
            <Text style={Styles.homeLinkTitle}>Activities</Text>
          </Pressable>
        </View>
        <View style={Styles.homeCol}>
          <Pressable
            style={Styles.homeLink}
            onPress={() => navigation.navigate('Communicate')}>
            <Image
              style={Styles.homeLinkIcon}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
            <Text style={Styles.homeLinkTitle}>Msg</Text>
          </Pressable>
        </View>
      </View>
      <View style={Styles.homeRow}>
        <View style={Styles.homeCol}>
          <Pressable
            style={Styles.homeLink}
            onPress={() => navigation.navigate('Activities')}>
            <Image
              style={Styles.homeLinkIcon}
              source={require('./img/events.png')}
            />
            <Text style={Styles.homeLinkTitle}>Contact</Text>
          </Pressable>
        </View>

        <View style={Styles.homeCol}>
          <Pressable
            style={Styles.homeLink}
            onPress={() => navigation.navigate('Communicate')}>
            <Image
              style={Styles.homeLinkIcon}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
            <Text style={Styles.homeLinkTitle}>About</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
