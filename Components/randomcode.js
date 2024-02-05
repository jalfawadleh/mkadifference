// const featureCollection = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       id: 1,
//       type: 'Feature',
//       properties: {
//         name: 'O',
//       },
//       geometry: {
//         coordinates: [-122.27150772059446, 37.80407911943172],
//         type: 'Point',
//       },
//     },
//     {
//       id: 2,
//       type: 'Feature',
//       properties: {
//         name: 'B',
//       },
//       geometry: {
//         coordinates: [-122.27272112503658, 37.87140376652819],
//         type: 'Point',
//       },
//     },
//     {
//       id: 3,
//       type: 'Feature',
//       properties: {
//         name: 'E',
//       },
//       geometry: {
//         coordinates: [-122.28684324374171, 37.83133182679214],
//         type: 'Point',
//       },
//     },
//     {
//       id: 4,
//       type: 'Feature',
//       properties: {
//         name: 'P',
//       },
//       geometry: {
//         coordinates: [-122.23392371940557, 37.82436097198746],
//         type: 'Point',
//       },
//     },
//   ],
// };

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

// locationPoint: {
//   height: 15,
//   width: 15,
//   backgroundColor: 'red',
//   borderRadius: 40,
//   alignItems: 'center',
//   justifyContent: 'center',
// },

// const heatMap = () => {
//   return (
//     <Mapbox.HeatmapLayer
//       id="earthquakes"
//       sourceID="earthquakes"
//       style={{
//         heatmapColor: [
//           'interpolate',
//           ['linear'],
//           ['heatmap-density'],
//           0,
//           'rgba(33,102,172,0)',
//           0.2,
//           'rgb(103,169,207)',
//           0.4,
//           'rgb(209,229,240)',
//           0.6,
//           'rgb(253,219,199)',
//           0.8,
//           'rgb(239,138,98)',
//           1,
//           'rgb(178,24,43)',
//         ],
//       }}
//     />
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

// clusters
// https://github.com/rnmapbox/maps/blob/main/example/src/examples/SymbolCircleLayer/Earthquakes.tsx

// <Image
//  style={styles.linkImage}
//  source={{
//    uri: `https://api.multiavatar.com/${user.username}.png`,
//  }}
// />

// const menu = (
//   <>
//     {/* <Pressable
//       onPress={() => setUser(prevState => ({...prevState, _id: ''}))}>
//       <Image style={styles.linkImage} source={require('./img/close.png')} />
//     </Pressable> */}
//     <Pressable onPress={() => navigation.navigate('Activities')}>
//       <Image
//         style={styles.linkImage}
//         source={require('./img/activity.png')}
//       />
//     </Pressable>
//     <Pressable onPress={() => navigation.navigate('Feed')}>
//       <Image style={styles.linkImage} source={require('./img/feed.png')} />
//     </Pressable>

//     <Pressable onPress={() => navigation.navigate('Messages')}>
//       <Image
//         style={styles.linkImage}
//         source={require('./img/messages.png')}
//       />
//     </Pressable>
//   </>
// );
