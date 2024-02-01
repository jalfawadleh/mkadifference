// import axios from 'axios';

// https://github.com/rnmapbox/maps/blob/main/README.md

import React, {useState} from 'react';
import {Text, View} from 'react-native';

import MapboxGL from '@rnmapbox/maps';

import {Styles} from './Styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Location({loc = [0, 0], setElement}) {
  const [mapWidth, setMapWidth] = useState(200);

  return (
    <>
      <View style={Styles.box}>
        <Text style={Styles.header}>Location</Text>
        <View
          style={Styles.container}
          onLayout={event => {
            setMapWidth(event.nativeEvent.layout.width);
          }}>
          <MapboxGL.MapView
            zoomEnabled
            scrollEnabled
            pitchEnabled
            scaleBarEnabled={false}
            compassEnabled={true}
            style={{width: mapWidth, height: mapWidth}}
            onPress={e =>
              setElement(prevState => ({
                ...prevState,
                location: e.geometry.coordinates,
              }))
            }>
            <MapboxGL.Camera
              zoomLevel={12}
              centerCoordinate={loc}
              animationDuration={0}
            />
            <MapboxGL.MarkerView
              id="locationPoint"
              title="locationPoint"
              coordinate={loc}
              isDraggable={false}
              onDrag={null}>
              <View style={Styles.locationPoint} />
            </MapboxGL.MarkerView>
          </MapboxGL.MapView>
        </View>
      </View>
    </>
  );
}

// ERROR  Mapbox error MapLoad error Source RNMBX-mapview-point-annotations_drag is not in style
// {"level": "error", "message": "MapLoad error Source RNMBX-mapview-point-annotations_drag is not in style"}
