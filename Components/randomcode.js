const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      id: 1,
      type: 'Feature',
      properties: {
        name: 'O',
      },
      geometry: {
        coordinates: [-122.27150772059446, 37.80407911943172],
        type: 'Point',
      },
    },
    {
      id: 2,
      type: 'Feature',
      properties: {
        name: 'B',
      },
      geometry: {
        coordinates: [-122.27272112503658, 37.87140376652819],
        type: 'Point',
      },
    },
    {
      id: 3,
      type: 'Feature',
      properties: {
        name: 'E',
      },
      geometry: {
        coordinates: [-122.28684324374171, 37.83133182679214],
        type: 'Point',
      },
    },
    {
      id: 4,
      type: 'Feature',
      properties: {
        name: 'P',
      },
      geometry: {
        coordinates: [-122.23392371940557, 37.82436097198746],
        type: 'Point',
      },
    },
  ],
};

// const markerView = location => {
//   return (
//     <MapboxGL.MarkerView id="markerView" key="markerView" coordinate={location}>
//       <View
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{
//           height: 20,
//           width: 20,
//           backgroundColor: '#f00',
//           borderRadius: 15,
//           borderColor: '#fff',
//           borderWidth: 3,
//         }}
//       />
//     </MapboxGL.MarkerView>
//   );
// };

// const heatMap = () => {
//   return (
//     <MapboxGL.ShapeSource
//       id="earthquakes"
//       url="https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
//       <MapboxGL.HeatmapLayer
//         id="earthquakes"
//         sourceID="earthquakes"
//         style={{
//           heatmapColor: [
//             'interpolate',
//             ['linear'],
//             ['heatmap-density'],
//             0,
//             'rgba(33,102,172,0)',
//             0.2,
//             'rgb(103,169,207)',
//           ],
//         }}
//       />
//     </MapboxGL.ShapeSource>
//   );
// };

// const features = [];
//   results.map(item => ({
//     id: item._id,
//     type: item.type,
//     properties: {
//       name: item.name,
//     },
//     geometry: {
//       coordinates: item.location,
//       type: 'Point',
//     },
//   }));
