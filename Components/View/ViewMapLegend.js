// import axios from 'axios';
import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

export default function ViewMapLegend({
  showMembers,
  setShowMembers,
  showActivities,
  setShowActivities,
}) {
  return (
    <View style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,

    borderBottomWidth: 2,
    borderBottomColor: 'white',
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
});
