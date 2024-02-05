// import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Pressable,
  Modal,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import MapboxGL from '@rnmapbox/maps';

import axios from 'axios';
import {ViewActivity} from '.';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Home({navigation, user, setUser}) {
  const focused = useIsFocused();
  const [search, setSearch] = useState('');
  const [darkmood, setDarkMood] = useState(user.darkmood);

  const [modalContent, setModalcontent] = useState('');

  const [membersPoints, setMembersPoints] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [activitiesPoints, setActivitiesPoints] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const [showMembers, setShowMembers] = useState(true);
  const [showActivities, setShowActivities] = useState(true);

  const modal = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalContent ? true : false}
      onRequestClose={() => setModalcontent('')}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {modalContent ? modalContent : ''}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalcontent('')}>
            <Text style={styles.textStyle}>Close</Text>
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
        style={styles.rightMenuIcon}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.iconProfile}
          source={{
            uri: `https://api.multiavatar.com/${user.username}.png`,
          }}
        />
      </Pressable>
      <Pressable
        style={styles.rightMenuIcon}
        onPress={() => navigation.navigate('Updates')}>
        <Image
          style={styles.iconInactive}
          source={require('./img/updates.png')}
        />
      </Pressable>
      <Pressable
        style={styles.rightMenuIcon}
        onPress={() => navigation.navigate('Messages')}>
        <Image
          style={styles.iconActive}
          source={require('./img/messages.png')}
        />
      </Pressable>
    </View>
  );

  const mapLegend = (
    <View style={styles.legend}>
      <Pressable onPress={() => setShowMembers(!showMembers)}>
        <View style={styles.legendElement}>
          <View
            style={
              showMembers ? styles.legendMembers : styles.legendMembersInactive
            }
          />
          <Text style={styles.legendTitle}>Members</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => setShowActivities(!showActivities)}>
        <View style={styles.legendElement}>
          <View
            style={
              showActivities
                ? styles.legendActivities
                : styles.legendActivitiesInactive
            }
          />
          <Text style={styles.legendTitle}>Activities</Text>
        </View>
      </Pressable>
    </View>
  );

  const bottomPanel = (
    <View style={styles.bottomPanel}>
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
          style={styles.iconActivities}
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
      onPress={e =>
        setModalcontent(<ViewActivity id={e.features[0].properties.id} />)
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

  const searchResults = search && <Text style={styles.header}>{search}</Text>;

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
        touchZoomRotate={false}>
        {/* include camera modules */}
        {camera}

        {/* members layer */}
        {showMembers && members}

        {/* activities layer */}
        {showActivities && activities}

        {/* code to change to darkmood */}
        {styleImport}
      </MapboxGL.MapView>

      {topLeftMenu}
      {topRightMenu}
      {modal}

      <SafeAreaView style={styles.container}>
        {mapLegend}
        {bottomPanel}
        {searchResults}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
  },
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
  topRightMenu: {
    position: 'absolute',
    right: 15,
    top: 35,
    padding: 1,
  },
  rightMenuIcon: {
    marginBottom: 10,
    borderRadius: 40,
    tintColor: 'black',
  },
  iconDarkmood: {
    height: 25,
    width: 25,

    opacity: 0.8,
    tintColor: 'yellow',

    borderRadius: 25,
  },
  iconProfile: {
    height: 40,
    width: 40,
  },
  iconInactive: {
    height: 40,
    width: 40,
    tintColor: '#5555ff',
    shadowColor: '#777777',
    shadowOpacity: 0.4,
  },
  iconActive: {
    height: 40,
    width: 40,
    tintColor: '#ff5555',
    shadowColor: '#666666',
    shadowOpacity: 0.4,
  },
  iconActivities: {
    height: 40,
    width: 40,
    marginLeft: 5,
    marginRight: 5,
    tintColor: '#bbbbbb',
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendElement: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,

    borderRadius: 25,
    backgroundColor: '#333333',
  },
  legendMembers: {
    width: 20,
    height: 20,

    borderRadius: 20,

    backgroundColor: 'green',
  },
  legendActivities: {
    width: 20,
    height: 20,

    borderRadius: 20,

    backgroundColor: 'red',
  },
  legendMembersInactive: {
    width: 20,
    height: 20,

    borderRadius: 20,
    borderColor: 'green',
    borderWidth: 2,

    backgroundColor: '#cccccc',
  },
  legendActivitiesInactive: {
    width: 20,
    height: 20,

    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 2,

    backgroundColor: '#cccccc',
  },
  legendTitle: {
    marginRight: 5,
    padding: 0,
    fontSize: 20,
    color: 'white',
  },

  bottomPanel: {
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

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
