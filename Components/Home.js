// import axios from 'axios';
import React, {useState} from 'react';
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

import {ViewMap, ViewActivity, ViewMember} from '.';
import ViewMapLegend from './View/ViewMapLegend';

export default function Home({navigation, user, setUser}) {
  // const [mapCenter, setMapCenter] = useState(user.location);

  const [darkmood, setDarkMood] = useState(user.darkmood);

  const [modalContent, setModalcontent] = useState('');

  const [showMembers, setShowMembers] = useState(true);
  const [showActivities, setShowActivities] = useState(true);

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

  return (
    <>
      <ViewMap
        user={user}
        showMembers={showMembers}
        showActivities={showActivities}
        setModalcontent={setModalcontent}
        darkmood={darkmood}
      />
      <View style={styles.darkmoodSwitch}>
        <Pressable onPress={() => setDarkMood(!darkmood)}>
          <Image
            style={styles.iconDarkmood}
            source={require('./img/dark.png')}
          />
        </Pressable>
      </View>
      {modal}

      <View style={styles.container}>
        <ViewMapLegend
          showMembers={showMembers}
          showActivities={showActivities}
          setShowMembers={setShowMembers}
          setShowActivities={setShowActivities}
        />
        <View style={styles.bottomMenu}>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <Image style={styles.icon} source={require('./img/search.png')} />
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
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
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
