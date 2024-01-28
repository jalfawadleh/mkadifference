import React from 'react';
import {Button, Text, View} from 'react-native';

import {Styles} from '../Common/Styles';

export default function ViewActivity({navigation, route}) {
  const activity = route.params.activity;
  return (
    <>
      <View style={Styles.box}>
        <Text>{activity.name}</Text>
        <Text>{activity.description}</Text>
        {/* <Stages
          activity={activity}
          setActivity={setActivity}
          putActivity={putActivity}
        /> */}

        <View style={Styles.rowButtons}>
          <Button
            style={Styles.button}
            title="Back"
            onPress={() => navigation.navigate('Activities')}
          />
        </View>
      </View>
    </>
  );
}
