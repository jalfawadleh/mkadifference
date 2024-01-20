// import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Mapbox(probs: {user: any}): React.JSX.Element {
  //const x = `https://api.multiavatar.com/${probs.user.username}.png`;

  return (
    <View style={styles.view}>
      <Text>Mapbox</Text>
      <Text>{probs.user._id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    margin: 0,
    padding: 0,
  },
});
