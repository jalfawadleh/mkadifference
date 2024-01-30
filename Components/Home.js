// import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, TextInput, Image, View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import MapboxGL from '@rnmapbox/maps';

import {Styles} from './Common/Styles';

export default function Home({navigation, user}) {
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputPanel}>
        <View style={styles.inputBox}>
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
      {showMenu && (
        <View style={styles.linkMenu}>
          <Pressable onPress={() => navigation.navigate('Activities')}>
            <Image
              style={styles.linkImage}
              source={require('./img/events.png')}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Activities')}>
            <Image
              style={styles.linkImage}
              source={require('./img/mapbox.png')}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Activities')}>
            <Image
              style={styles.linkImage}
              source={require('./img/search.png')}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Activities')}>
            <Image
              style={styles.linkImage}
              source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
            />
          </Pressable>
        </View>
      )}
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

  inputPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 5,
    padding: 0,
    height: 50,

    borderRadius: 25,
    backgroundColor: '#3c2f2f',
  },
  inputBox: {
    flex: 6,
    flexDirection: 'row',

    paddingLeft: 5,

    alignItems: 'stretch',
  },
  searchIcon: {
    flex: 1,

    height: 40,
    width: 40,
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
    backgroundColor: '#3c2f2f',
  },
  linkImage: {
    alignSelf: 'center',
    height: 40,
    width: 40,
    backgroundColor: '#3c2f2f',
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
