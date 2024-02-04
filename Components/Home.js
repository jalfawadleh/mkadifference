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

export default function Home({navigation, user, setUser}) {
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [darkmood, setDarkMood] = useState(user.darkmood);
  const [membersPoints, setMembersPoints] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [activitiesPoints, setActivitiesPoints] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const menu = (
    <View style={styles.linkMenu}>
      <Pressable
        onPress={() => setUser(prevState => ({...prevState, _id: ''}))}>
        <Image style={styles.linkImage} source={require('./img/search.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Image style={styles.linkImage} source={require('./img/mapbox.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Activities')}>
        <Image style={styles.linkImage} source={require('./img/events.png')} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Activities')}>
        <Image style={styles.linkImage} source={require('./img/search.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.linkImage}
          source={{
            uri: `https://api.multiavatar.com/${user.username}.png`,
          }}
        />
      </Pressable>
    </View>
  );

  const inputPanel = (
    <View style={styles.inputPanel}>
      <View style={styles.inputBox}>
        <Image style={styles.searchIcon} source={require('./img/search.png')} />
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
  );

  const camera = (
    <MapboxGL.Camera
      zoomLevel={12}
      centerCoordinate={user.location}
      animationDuration={0}
      pitch={0}
      bearing={0}
    />
  );

  const styleImport = (
    <MapboxGL.StyleImport
      id="basemap"
      existing
      config={{
        lightPreset: darkmood ? 'night' : 'day',
      }}
    />
  );

  const members = (
    <MapboxGL.ShapeSource
      id="membersShapeSource"
      shape={membersPoints}
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
        id="membersCircleLayer"
        style={styles.membersCircleLayer}
      />
      {darkmood && (
        <MapboxGL.HeatmapLayer
          id="membersHeatmapLayer"
          style={styles.membersHeatmapLayer}
        />
      )}
    </MapboxGL.ShapeSource>
  );

  const activities = (
    <MapboxGL.ShapeSource
      id="activitiesShapeSource"
      shape={activitiesPoints}
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
        id="activitieCircleLayer"
        style={styles.activitiesCircleLayer}
      />

      {darkmood && (
        <MapboxGL.HeatmapLayer
          id="activitiesHeatmapLayer"
          style={styles.activitiesHeatmapLayer}
        />
      )}
    </MapboxGL.ShapeSource>
  );

  const getMapItems = async () => {
    const {data} = await axios.get('map/');
    setActivitiesPoints(data.activitiesPoints);
    setMembersPoints(data.membersPoints);
    console.log(data.activitiesPoints);
  };

  useEffect(() => {
    getMapItems();
  }, []);

  return (
    <>
      <MapboxGL.MapView
        // styleURL={'mapbox://styles/mapbox/standard'}
        styleURL="Mapbox.StyleURL.Street"
        zoomEnabled
        scaleBarEnabled={false}
        style={styles.map}
        attributionEnabled={false}
        logoEnabled={false}
        dragRotate={false}
        touchZoomRotate={false}
        onTouchStart={() => setShowMenu(false)}>
        {camera}
        {styleImport}

        {members}

        {activities}
      </MapboxGL.MapView>
      <View style={styles.darkmood}>
        <Button
          title={darkmood ? 'Light Mood' : 'Dark Mood'}
          onPress={() => setDarkMood(!darkmood)}
        />
      </View>
      <SafeAreaView style={styles.container}>
        {showMenu && menu}
        {inputPanel}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  membersCircleLayer: {
    circleRadius: 10,
    circleColor: 'green',
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },
  membersHeatmapLayer: {
    heatmapRadius: 25,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      1,
      'rgb(98,239,98)',
      2,
      'rgb(0,255,0)',
    ],
  },

  activitiesCircleLayer: {
    circleRadius: 10,
    circleColor: 'red',
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },
  activitiesHeatmapLayer: {
    heatmapRadius: 25,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      1,
      'rgb(98,239,98)',
      2,
      'rgb(0,255,0)',
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
