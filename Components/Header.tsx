import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function Header(probs: {setNav: any}): React.JSX.Element {
  const setNav = probs.setNav;
  return (
    <View style={styles.header}>
      <Pressable onPress={() => setNav('search')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/search.png')}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => setNav('mapbox')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/mapbox.png')}
          />
        </View>
      </Pressable>
      <Text style={styles.headerLogo}>MKaDifference</Text>

      <Pressable onPress={() => setNav('manage')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/manage.png')}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => setNav('messages')}>
        <View style={styles.headerElement}>
          <Image
            style={styles.headerIcon}
            source={require('./img/message.png')}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 0,
    paddingTop: 20,
    backgroundColor: '#3c2f2f',
  },
  headerElement: {
    flex: 1,
    margin: 4,
    height: 40,
    width: 40,
    color: 'white',

    borderColor: '#fff4e6',
    borderWidth: 2,

    // backgroundColor: '#be9b7b',
  },
  headerIcon: {
    height: 30,
    width: 30,
    margin: 4,
  },
  headerLogo: {
    flex: 4,
    padding: 4,
    height: 40,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
