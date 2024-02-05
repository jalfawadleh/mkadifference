// import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Pressable,
  Alert,
  Modal,
  Text,
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalcontent] = useState('');

  const showMember = id => {
    setModalcontent(id);
    setModalVisible(true);
  };

  const showActivity = id => {
    setModalcontent(id);
    setModalVisible(true);
  };

  const modal = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Text style={styles.modalText}>{modalContent}</Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  const topLeftMenu = (
    <View style={styles.topLeftMenu}>
      <Pressable onPress={() => setDarkMood(!darkmood)}>
        <Image style={styles.iconDarkmood} source={require('./img/dark.png')} />
      </Pressable>
    </View>
  );

  const topRightMenu = (
    <View style={styles.topRightMenu}>
      <Pressable
        style={styles.menuIconBox}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.iconProfile}
          source={{
            uri: `https://api.multiavatar.com/${user.username}.png`,
          }}
        />
      </Pressable>
      <Pressable
        style={styles.menuIconBox}
        onPress={() => navigation.navigate('Updates')}>
        <Image
          style={styles.iconInactive}
          source={require('./img/updates.png')}
        />
      </Pressable>
      <Pressable
        style={styles.iconActive}
        onPress={() => navigation.navigate('Messages')}>
        <Image
          style={styles.iconActive}
          source={require('./img/messages.png')}
        />
      </Pressable>
    </View>
  );

  const inputBox = (
    <View style={styles.inputPanel}>
      <Image style={styles.searchIcon} source={require('./img/search.png')} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor={styles.placeholderTextColor}
        onChangeText={setSearch}
        // onEndEditing={setSearch}
        value={search}
        autoCapitalize="none"
      />
      <Pressable onPress={() => navigation.navigate('Activities')}>
        <Image
          style={styles.activitiesIcon}
          source={require('./img/activities.png')}
        />
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
      onPress={e => showMember(e.features[0].properties.id)}>
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
      onPress={e => showActivity(e.features[0].properties.id)}>
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

      {topLeftMenu}
      {topRightMenu}

      <SafeAreaView style={styles.container}>
        {inputBox}
        {modal}
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
      'green',
      0.6,
      'rgb(44,219,44)',
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
    heatmapRadius: 20,
    heatmapOpacity: 0.85,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'red',
      0.6,
      'rgb(219,44,44)',
      1,
      'rgb(239,98,98)',
      2,
      'rgb(255,0,0)',
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

    margin: 0,

    paddingTop: 10,
    paddingLeft: 5,
    height: 50,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    // borderRadius: 25,
    backgroundColor: 'black',
  },

  searchIcon: {
    height: 30,
    width: 30,
    marginTop: 5,
    marginLeft: 10,
    zIndex: 1,
  },
  searchInput: {
    flex: 5,
    marginLeft: -35,
    marginRight: 5,
    paddingRight: 5,
    paddingLeft: 35,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    borderColor: '#bbbbbb',
    borderWidth: 2,
    borderRadius: 15,
  },
  placeholderTextColor: '#aaaaaa',

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

  topLeftMenu: {
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

  topRightMenu: {
    position: 'absolute',
    right: 15,
    top: 35,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 40,
    padding: 1,
  },

  iconProfile: {
    height: 40,
    width: 40,
  },

  iconInactive: {
    height: 40,
    width: 40,
    tintColor: 'green',
  },

  iconActive: {
    height: 40,
    width: 40,
    tintColor: 'red',
  },

  activitiesIcon: {
    height: 40,
    width: 40,
    marginLeft: 5,
    marginRight: 5,
  },

  menuIconBox: {
    marginBottom: 10,
    borderRadius: 40,
    tintColor: 'black',
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
