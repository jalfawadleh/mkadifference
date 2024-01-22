import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';
import Messages from './Messages';
import Search from './Search';
import Manage from './Manage';
import Mapbox from './Mapbox';

export default function Home({user}) {
  const [nav, setNav] = useState('');

  return (
    // Main Container
    <View style={styles.container}>
      {/* Header */}
      <Header setNav={setNav} />

      {/* Main */}
      <View style={styles.main}>
        {nav === 'search' && <Search user={user} />}
        {nav === 'mapbox' && <Mapbox />}
        {nav === 'manage' && <Manage user={user} />}
        {nav === 'messages' && <Messages user={user} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    margin: 0,
  },
  main: {
    flex: 13,
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    backgroundColor: '#be9b7b',
  },
});
