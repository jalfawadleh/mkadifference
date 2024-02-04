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
import {useIsFocused} from '@react-navigation/native';

import MapboxGL from '@rnmapbox/maps';

import axios from 'axios';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Home({navigation, user, setUser}) {
  const focused = useIsFocused();
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

  const inputBox = (
    <View style={styles.inputPanel}>
      <Image style={styles.linkImage} source={require('./img/filter.png')} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor={styles.placeholderTextColor}
        onChangeText={setSearch}
        // onEndEditing={setSearch}
        value={search}
        autoCapitalize="none"
      />
      <Pressable onPress={() => setShowMenu(!showMenu)}>
        <Image style={styles.linkImage} source={require('./img/menu.png')} />
      </Pressable>
    </View>
  );

  const menu = (
    <View style={styles.inputPanel}>
      <Pressable
        onPress={() => setUser(prevState => ({...prevState, _id: ''}))}>
        <Image style={styles.linkImage} source={require('./img/close.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Activities')}>
        <Image
          style={styles.linkImage}
          source={require('./img/activity.png')}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Feed')}>
        <Image style={styles.linkImage} source={require('./img/feed.png')} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Messages')}>
        <Image
          style={styles.linkImage}
          source={require('./img/messages.png')}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.linkImage}
          source={require('./img/settings.png')}
        />
      </Pressable>
      <Pressable onPress={() => setShowMenu(!showMenu)}>
        <Image style={styles.linkImage} source={require('./img/search.png')} />
      </Pressable>
    </View>
  );

  const camera = (
    <MapboxGL.Camera
      zoomLevel={10}
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
  };

  useEffect(() => {
    if (focused) {
      getMapItems();
    }
  }, [focused]);

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
        <Pressable onPress={() => setDarkMood(!darkmood)}>
          <Image
            style={styles.darkmoodImage}
            source={require('./img/dark.png')}
          />
        </Pressable>
      </View>
      <View style={styles.profile}>
        <Image
          style={styles.profileImage}
          source={{
            uri: `https://api.multiavatar.com/${user.username}.png`,
          }}
        />
      </View>
      <SafeAreaView style={styles.container}>
        {showMenu ? menu : inputBox}
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
    justifyContent: 'space-between',

    margin: 5,
    padding: 5,
    height: 50,

    borderRadius: 25,
    backgroundColor: 'black',
  },

  searchIcon: {
    height: 50,
    width: 50,
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  searchInput: {
    flex: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
  },
  placeholderTextColor: '#aaaaaa',
  linkImage: {
    margin: 0,
    height: 40,
    width: 40,
    backgroundColor: 'white',
    // borderColor: 'black',
    // borderWidth: 2,
    borderRadius: 25,
    tintColor: '#333333',
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
    left: 15,
    top: 35,
  },
  darkmoodImage: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    tintColor: 'yellow',
    borderRadius: 25,
  },
  profile: {
    position: 'absolute',
    right: 15,
    top: 35,
  },
  profileImage: {
    height: 50,
    width: 50,
  },
});
