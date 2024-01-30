// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, TextInput, Image, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import MapboxGL from '@rnmapbox/maps';

import {Styles} from './Common/Styles';

export default function Search({user}) {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputPanel}>
        <View style={styles.searchBox}>
          <Image
            style={Styles.searchIcon}
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

          <View style={styles.linksBox}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
            <Image
              style={styles.linkImage}
              source={require('./img/events.png')}
            />
            <Image
              style={styles.linkImage}
              source={require('./img/mapbox.png')}
            />
            <Image
              style={styles.linkImage}
              source={require('./img/search.png')}
            />
            <Image
              style={styles.linkImage}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
          </View>
        </View>
      </View>
      <MapboxGL.MapView
        zoomEnabled
        scrollEnabled
        pitchEnabled
        scaleBarEnabled={false}
        style={styles.map}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    marginLeft: 5,
    padding: 5,
  },
  searchIcon: {
    height: 40,
    width: 40,
    marginTop: 6,
    padding: 0,
    zIndex: 1,
  },
  searchInput: {
    marginLeft: -45,
    paddingLeft: 45,
    paddingRight: 55,

    width: '100%',
    height: 50,

    fontSize: 20,
    fontWeight: 'bold',

    color: 'white',
    borderRadius: 25,
    backgroundColor: '#be9b7b',
  },

  linksBox: {
    flex: 1,
    marginLeft: -50,
  },
  profileImage: {
    height: 50,
    width: 50,
    marginBottom: 15,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
  },

  linkImage: {
    height: 50,
    width: 50,
    marginBottom: 15,
    borderColor: 'white',
    backgroundColor: '#be9b7b',
    borderWidth: 2,
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
});
