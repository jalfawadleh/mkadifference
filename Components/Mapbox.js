// import axios from 'axios';
import React, {useState} from 'react';
import {View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';

import {Styles} from './Common/Styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Mapbox({user}) {
  //const x = `https://api.multiavatar.com/${probs.user.username}.png`;

  const [mapLayout, setMapLayout] = useState({width: 200, height: 200});

  return (
    <View
      style={Styles.container}
      onLayout={event => {
        setMapLayout({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        });
      }}>
      <MapboxGL.MapView
        zoomEnabled
        scrollEnabled
        pitchEnabled
        scaleBarEnabled={false}
        compassEnabled={true}
        style={{width: mapLayout.width - 10, height: mapLayout.height - 10}}
        // onPress={e =>
        //   setElement(prevState => ({
        //     ...prevState,
        //     location: e.geometry.coordinates,
        //   }))
        // }
      >
        <MapboxGL.Camera zoomLevel={12} centerCoordinate={user.location} />
        <MapboxGL.PointAnnotation
          id="locationPoint"
          title="locationPoint"
          coordinate={user.location}
          isDraggable={false}
          onDrag={null}>
          <View style={Styles.locationPoint} />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
}
