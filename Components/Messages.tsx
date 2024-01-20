// import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Messages(probs: {user: any}): React.JSX.Element {
  const x = `https://api.multiavatar.com/${probs.user.username}.png`;

  return (
    <View style={styles.view}>
      <Text>{x}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
});
