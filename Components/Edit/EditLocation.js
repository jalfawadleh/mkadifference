// import axios from 'axios';

// https://github.com/rnmapbox/maps/blob/main/README.md

import React, {useState} from 'react';
import {Text, View} from 'react-native';

import MapboxGL from '@rnmapbox/maps';

import {Styles} from '../Common/Styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function EditLocation({loc = [0, 0], setElement}) {
  const [mapWidth, setMapWidth] = useState(200);

  return (
    <>
      <View style={Styles.box}>
        <Text style={Styles.header}>Location</Text>
        <Text style={Styles.note}>
          Location used to center the home page map
        </Text>
        <Text style={Styles.note}>Click on the map to set the location</Text>
        <View
          style={Styles.container}
          onLayout={event => {
            setMapWidth(event.nativeEvent.layout.width);
          }}>
          <MapboxGL.MapView
            scaleBarEnabled={false}
            attributionEnabled={false}
            logoEnabled={false}
            dragRotate={false}
            touchZoomRotate={false}
            style={{width: mapWidth, height: mapWidth}}
            onPress={e =>
              setElement(prevState => ({
                ...prevState,
                location: e.geometry.coordinates,
              }))
            }>
            <MapboxGL.Camera
              zoomLevel={10}
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
