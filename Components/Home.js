import React, {useState} from 'react';
import {StyleSheet, Image, View, Pressable} from 'react-native';

import {ViewMapLegend, ViewMap, ViewModal, Search} from '.';

export default function Home({navigation, user, setUser}) {
  // const [mapCenter, setMapCenter] = useState(user.location);

  const [darkmood, setDarkMood] = useState(user.darkmood);

  const [modalContent, setModalContent] = useState('');

  const [showMembers, setShowMembers] = useState(true);
  const [showActivities, setShowActivities] = useState(true);

  return (
    <>
      <ViewMap
        user={user}
        showMembers={showMembers}
        showActivities={showActivities}
        setModalcontent={setModalContent}
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

      <ViewModal
        modalContent={modalContent}
        setModalcontent={setModalContent}
      />

      <View style={styles.container}>
        <ViewMapLegend
          showMembers={showMembers}
          showActivities={showActivities}
          setShowMembers={setShowMembers}
          setShowActivities={setShowActivities}
        />
        <View style={styles.bottomMenu}>
          <Pressable onPress={() => navigation.navigate('Search')}>
            {/* <Pressable onPress={() => setModalContent(<Search user={user} />)}> */}
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
              style={styles.icon}
              source={require('./img/activities.png')}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Profile')}>
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
});
