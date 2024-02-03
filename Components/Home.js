// import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import MapboxGL from '@rnmapbox/maps';

import {Styles} from './Common/Styles';
import axios from 'axios';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Home({navigation, user}) {
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [darkmood, setDarkMood] = useState(user.darkmood);

  const [mapItems, setMapItems] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const getMapItems = async () => {
    const {data} = await axios.get('map/');
    setMapItems(data);
  };

  useEffect(() => {
    getMapItems();
  }, []);

  return (
    <>
      <MapboxGL.MapView
        styleURL={'mapbox://styles/mapbox/standard'}
        zoomEnabled
        scaleBarEnabled={false}
        style={styles.map}
        attributionEnabled={false}
        logoEnabled={false}
        dragRotate={false}
        touchZoomRotate={false}
        onTouchStart={() => setShowMenu(false)}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={user.location}
          animationDuration={0}
          pitch={0}
          bearing={0}
        />
        <MapboxGL.StyleImport
          id="basemap"
          existing
          config={{
            lightPreset: darkmood ? 'night' : 'day',
          }}
        />
        {/* {markerView(user.location)} */}

        <MapboxGL.ShapeSource
          id="exampleShapeSource"
          shape={mapItems}
          onPress={e =>
            Alert.alert(
              e.features[0].properties.name +
                ' ' +
                e.features[0].properties.id +
                ' ' +
                e.features[0].properties.type,
            )
          }>
          <MapboxGL.CircleLayer
            id="CircleLayer"
            key="CircleLayer"
            style={styles.circleLayer}
          />
          <MapboxGL.HeatmapLayer
            id="earthquakes"
            sourceID="exampleShapeSource"
            style={styles.HeatmapLayer}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
      <View style={styles.darkmood}>
        <Button
          title={darkmood ? 'Light Mood' : 'Dark Mood'}
          onPress={() => setDarkMood(!darkmood)}
        />
      </View>
      <SafeAreaView style={styles.container}>
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
  circleLayer: {
    circleRadius: 15,
    circleColor: '#ED4B82',
  },
  HeatmapLayer: {
    heatmapRadius: 20,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(113,102,72,0)',
      0.2,
      'rgb(203,169,107)',
      0.3,
      'rgb(244,69,107)',
    ],
  },
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
    top: 15,
  },
});
