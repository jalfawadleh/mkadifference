// import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Pressable} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import MapboxGL from '@rnmapbox/maps';

import axios from 'axios';
import {ViewActivity, ViewMember} from '.';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Map({
  user,
  showMembers,
  showActivities,
  setModalcontent,
}) {
  const focused = useIsFocused();

  // const [mapCenter, setMapCenter] = useState(user.location);

  const [darkmood, setDarkMood] = useState(user.darkmood);

  const [membersPoints, setMembersPoints] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [activitiesPoints, setActivitiesPoints] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const camera = (
    <MapboxGL.Camera
      zoomLevel={10}
      centerCoordinate={user.location}
      animationDuration={0}
      pitch={0}
      bearing={0}
    />
  );

  const members = (
    <MapboxGL.ShapeSource
      id="membersShapeSource"
      shape={membersPoints}
      onPress={e =>
        setModalcontent(<ViewMember id={e.features[0].properties.id} />)
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
        setModalcontent(<ViewActivity id={e.features[0].properties.id} />)
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
        styleURL="Mapbox.StyleURL.Street"
        zoomEnabled
        scaleBarEnabled={false}
        style={styles.container}
        attributionEnabled={false}
        logoEnabled={false}
        dragRotate={false}
        touchZoomRotate={false}>
        {/* include camera modules */}
        {camera}

        {/* members layer */}
        {showMembers && members}

        {/* activities layer */}
        {showActivities && activities}

        {/* code to change to darkmood */}
        <MapboxGL.StyleImport
          id="basemap"
          existing
          config={{lightPreset: darkmood ? 'night' : 'day'}}
        />
      </MapboxGL.MapView>
      <View style={styles.darkmoodSwitch}>
        <Pressable onPress={() => setDarkMood(!darkmood)}>
          <Image
            style={styles.iconDarkmood}
            source={require('./img/dark.png')}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
  },
  membersCircleLayer: {
    circleRadius: 8,
    circleColor: '#11bb11',
  },
  membersHeatmapLayer: {
    heatmapRadius: 8,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(0,0,0,0)',
      0.01,
      '#11bb11',
      1,
      '#11bb11',
    ],
  },
  activitiesCircleLayer: {
    circleRadius: 8,
    circleColor: '#ff1111',
  },
  activitiesHeatmapLayer: {
    heatmapRadius: 8,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(0,0,0,0)',
      0.01,
      '#ff1111',
      1,
      '#ff1111',
    ],
  },

  darkmoodSwitch: {
    position: 'absolute',
    padding: 5,
    left: 15,
    top: 35,
    backgroundColor: '#555555',
    borderWidth: 4,
    borderColor: '#bbbb44',
    borderRadius: 50,
  },
  iconDarkmood: {
    height: 25,
    width: 25,

    opacity: 0.8,
    tintColor: 'yellow',

    borderRadius: 25,
  },
});
