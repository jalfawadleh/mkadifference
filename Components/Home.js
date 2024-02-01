// import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Pressable,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import MapboxGL from '@rnmapbox/maps';

import {Styles} from './Common/Styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Home({navigation, user}) {
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [darkMood, setDarkMood] = useState(user.darkMood);
  return (
    <>
      <MapboxGL.MapView
        styleURL="mapbox://styles/mapbox/standard"
        zoomEnabled
        scaleBarEnabled={false}
        style={styles.map}
        attributionEnabled={false}
        logoEnabled={false}
        onTouchStart={() => setShowMenu(false)}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={user.location}
          animationDuration={0}
        />

        <MapboxGL.MarkerView
          id="markerView"
          key={'markerView'}
          coordinate={user.location}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 20,
              width: 20,
              backgroundColor: '#f00',
              borderRadius: 15,
              borderColor: '#fff',
              borderWidth: 3,
            }}
          />
        </MapboxGL.MarkerView>
        <MapboxGL.StyleImport
          id="basemap"
          existing
          config={{
            lightPreset: darkMood ? 'night' : 'day',
          }}
        />
        <MapboxGL.Images images={{example: require('./img/search.png')}} />
      </MapboxGL.MapView>
      <View style={styles.darkmood}>
        <Button
          title={darkMood ? 'Light Mood' : 'Dark Mood'}
          onPress={() => setDarkMood(!darkMood)}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.darkmood}>
          <Button title="Dark Mood" onPress={() => setDarkMood(!darkMood)} />
        </View>

        {/* Menu */}
        {showMenu && (
          <View style={styles.linkMenu}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Image
                style={styles.linkImage}
                source={require('./img/mapbox.png')}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Activities')}>
              <Image
                style={styles.linkImage}
                source={require('./img/events.png')}
              />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Activities')}>
              <Image
                style={styles.linkImage}
                source={require('./img/search.png')}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Activities')}>
              <Image
                style={styles.linkImage}
                source={{
                  uri: `https://api.multiavatar.com/${user.username}.png`,
                }}
              />
            </Pressable>
          </View>
        )}
        <View style={styles.inputPanel}>
          <View style={styles.inputBox}>
            <Image
              style={styles.searchIcon}
              source={require('./img/search.png')}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={Styles.placeholderTextColor}
              onChangeText={setSearch}
              // onEndEditing={setSearch}
              value={search}
              autoCapitalize="none"
            />
          </View>
          <Pressable
            style={styles.profileButton}
            onPress={() => setShowMenu(!showMenu)}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  inputPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    margin: 5,
    padding: 0,
    height: 50,

    borderRadius: 25,
    backgroundColor: 'black',
  },
  inputBox: {
    flex: 6,
    flexDirection: 'row',

    paddingLeft: 5,

    alignItems: 'stretch',
  },
  searchIcon: {
    height: 40,
    width: 40,
    marginTop: 6,
    padding: 0,
  },
  searchInput: {
    flex: 5,
    paddingRight: 5,
    paddingLeft: 5,
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    borderColor: '#666666',
    borderWidth: 2,
    borderRadius: 10,
  },

  profileButton: {
    flex: 1,
    width: 50,
    height: 50,
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
  },

  linkMenu: {
    flexDirection: 'col',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',

    height: 230,
    width: 50,

    marginRight: 5,
    padding: 5,

    borderRadius: 25,
  },
  linkImage: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    backgroundColor: '#3c2f2f',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
  },

  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
  },
  locationPoint: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  darkmood: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
