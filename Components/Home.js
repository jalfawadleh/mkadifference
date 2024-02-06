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
  FlatList,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import MapboxGL from '@rnmapbox/maps';

import axios from 'axios';
import {ViewActivity, ViewMember} from '.';
import {Styles} from './Common/Styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Home({navigation, user, setUser}) {
  const focused = useIsFocused();
  const [darkmood, setDarkMood] = useState(user.darkmood);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
        setModalcontent(<ViewMember id={e.features[0].properties.id} />)
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

  const modal = (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalContent ? true : false}
      onRequestClose={() => setModalcontent('')}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          {modalContent ? modalContent : ''}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalcontent('')}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </SafeAreaView>
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
          style={styles.iconUpdates}
          source={require('./img/updates.png')}
        />
      </Pressable>
      <Pressable
        style={styles.rightMenuIcon}
        onPress={() => navigation.navigate('Messages')}>
        <Image
          style={styles.iconMessages}
          source={require('./img/messages.png')}
        />
      </Pressable>
    </View>
  );

  const bottomPanel = (
    <View style={styles.inputPanel}>
      <Image style={styles.searchIcon} source={require('./img/search.png')} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor={styles.placeholderTextColor}
        onChangeText={setSearchText}
        // onEndEditing={setSearch}
        value={searchText}
        autoCapitalize="none"
      />
      {searchText === '' ? (
        <Pressable onPress={() => navigation.navigate('Activities')}>
          <Image
            style={styles.iconActivities}
            source={require('./img/activities.png')}
          />
        </Pressable>
      ) : (
        <Pressable onPress={() => setSearchText('')}>
          <Image style={styles.iconClose} source={require('./img/close.png')} />
        </Pressable>
      )}
    </View>
  );

  const legend = (
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
      <Pressable>
        <View style={styles.legendElement}>
          <View style={styles.legendCommunities} />
          <Text style={styles.legendTitle}>Communities</Text>
        </View>
      </Pressable>
    </View>
  );

  const results = searchText !== '' && (
    <View style={Styles.searchResults}>
      <Text style={Styles.resultsTitle}>Hello</Text>
      <FlatList
        data={searchResults}
        renderItem={({item}) => (
          <Pressable style={Styles.box} key={item._id}>
            <Text style={Styles.title}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={item => item._id}
      />
      <Text style={styles.resultsTitle}>Results</Text>
    </View>
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

      {!modalContent && (
        <SafeAreaView
          style={searchText ? styles.containerSearchShow : styles.container}>
          <View style={styles.bottomPanel}>
            {bottomPanel}
            {legend}
            {results}
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,

    borderTopEndRadius: 25,
    borderTopStartRadius: 25,

    backgroundColor: 'black',
  },
  containerSearchShow: {
    top: 35,
    flex: 1,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,

    backgroundColor: 'black',
  },

  bottomPanel: {
    margin: 0,
    padding: 5,

    backgroundColor: 'black',
  },
  inputPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  iconActivities: {
    height: 40,
    width: 40,
    marginLeft: 5,
    marginRight: 5,
    tintColor: '#5555ff',
  },
  iconClose: {
    height: 35,
    width: 35,
    margin: 5,
    tintColor: '#dddddd',
    backgroundColor: '#777777',
    borderRadius: 40,
  },

  searchResults: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 25,
    color: 'white',
    height: 40,
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendElement: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    paddingLeft: 5,
    width: '100%',

    borderRadius: 25,
    backgroundColor: '#333333',
  },
  legendMembers: {
    width: 18,
    height: 18,

    borderRadius: 20,

    backgroundColor: 'green',
  },
  legendMembersInactive: {
    width: 18,
    height: 18,

    borderRadius: 20,
    borderColor: 'green',
    borderWidth: 1,

    backgroundColor: '#cccccc',
  },
  legendActivities: {
    width: 18,
    height: 18,

    borderRadius: 20,

    backgroundColor: 'red',
  },
  legendActivitiesInactive: {
    width: 18,
    height: 18,

    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 1,

    backgroundColor: '#cccccc',
  },
  legendCommunities: {
    width: 18,
    height: 18,

    borderRadius: 20,

    backgroundColor: 'orange',
  },
  legendTitle: {
    padding: 5,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
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
  iconMessages: {
    height: 40,
    width: 40,
    tintColor: '#5555ff',
  },
  iconUpdates: {
    height: 40,
    width: 40,
    tintColor: '#5555ff',
  },

  // modal
  centeredView: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
