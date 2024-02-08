// import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Pressable,
  Modal,
  Text,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import MapboxGL from '@rnmapbox/maps';

import axios from 'axios';
import {ViewActivity, ViewMember} from '.';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFsZmF3YWRsZWgiLCJhIjoiY2xnb3NpNW80MHNudDN0bHVteDZjam16MCJ9.baLbNA0lmuBZCHnzv3kBkA',
);
MapboxGL.setTelemetryEnabled(false);

export default function Home({navigation, user, setUser}) {
  const focused = useIsFocused();

  // const [mapCenter, setMapCenter] = useState(user.location);

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

  const camera = (
    <MapboxGL.Camera
      zoomLevel={10}
      centerCoordinate={user.location}
      animationDuration={0}
      pitch={0}
      bearing={0}
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
        <ScrollView>
          <View style={styles.modalView}>
            {modalContent ? modalContent : ''}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalcontent('')}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  // const topRightMenu = (
  //   <View style={styles.topRightMenu}>
  //     <Pressable
  //       style={styles.rightMenuIcon}
  //       onPress={() => navigation.navigate('Updates')}>
  //       <Image
  //         style={styles.iconUpdates}
  //         source={require('./img/updates.png')}
  //       />
  //     </Pressable>
  //     <Pressable
  //       style={styles.rightMenuIcon}
  //       onPress={() => navigation.navigate('Messages')}>
  //       <Image
  //         style={styles.iconMessages}
  //         source={require('./img/messages.png')}
  //       />
  //     </Pressable>
  //   </View>
  // );

  const bottomMenu = (
    <View style={styles.bottomMenu}>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <Image style={styles.icon} source={require('./img/search.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Activities')}>
        <Image style={styles.icon} source={require('./img/activities.png')} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Updates')}>
        <Image style={styles.icon} source={require('./img/updates.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Messages')}>
        <Image style={styles.icon} source={require('./img/messages.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Activities')}>
        <Image
          style={styles.profileIcon}
          source={{
            uri: `https://api.multiavatar.com/${user.username}.png`,
          }}
        />
      </Pressable>
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
        <MapboxGL.StyleImport
          id="basemap"
          existing
          config={{lightPreset: darkmood ? 'night' : 'day'}}
        />
      </MapboxGL.MapView>
      <View style={styles.darkmoodSwitch}>
        <Pressable onPress={() => setDarkMood(!darkmood)}>
          <Image
            style={styles.iconDarkmood}
            source={require('./img/dark.png')}
          />
        </Pressable>
      </View>
      {modal}

      {!modalContent && (
        <SafeAreaView style={styles.container}>
          {legend}
          {bottomMenu}
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',

    borderTopEndRadius: 25,
    borderTopStartRadius: 25,

    backgroundColor: '#222222',
  },

  bottomMenu: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    height: 40,
    width: 40,
    tintColor: '#dddddd',
  },
  profileIcon: {
    height: 40,
    width: 40,
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  legendElement: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 25,
    backgroundColor: '#333333',
  },
  legendTitle: {
    marginLeft: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  legendMembers: {
    width: 18,
    height: 18,

    borderRadius: 18,

    backgroundColor: '#11dd11',
  },
  legendMembersInactive: {
    width: 18,
    height: 18,

    borderRadius: 18,
    borderColor: '#11dd11',
    borderWidth: 2,

    backgroundColor: '#222222',
  },
  legendActivities: {
    width: 18,
    height: 18,

    borderRadius: 18,

    backgroundColor: '#ff1111',
  },
  legendActivitiesInactive: {
    width: 18,
    height: 18,

    borderRadius: 18,
    borderColor: '#ff1111',
    borderWidth: 2,

    backgroundColor: '#222222',
  },
  legendCommunities: {
    width: 18,
    height: 18,

    borderRadius: 18,

    backgroundColor: '#11ffff',
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
    circleRadius: 8,
    circleColor: '#11bb11',
  },
  membersHeatmapLayer: {
    heatmapRadius: 8,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(0,0,0,0)',
      0.01,
      '#11bb11',
      1,
      '#11bb11',
    ],
  },
  activitiesCircleLayer: {
    circleRadius: 8,
    circleColor: '#ff1111',
  },
  activitiesHeatmapLayer: {
    heatmapRadius: 8,
    heatmapColor: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(0,0,0,0)',
      0.01,
      '#ff1111',
      1,
      '#ff1111',
    ],
  },

  darkmoodSwitch: {
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

  iconProfile: {
    height: 40,
    width: 40,
  },
  // modal
  centeredView: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    top: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    opacity: 0.9,
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
