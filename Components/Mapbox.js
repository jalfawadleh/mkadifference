// import axios from 'axios';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);

export default function Mapbox() {
  //const x = `https://api.multiavatar.com/${probs.user.username}.png`;
  // MapboxGL.setTelemetryEnabled(false);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 600,
    width: 400,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});
