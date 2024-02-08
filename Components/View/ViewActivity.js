import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';

import {ViewStackText, ViewNameDesc} from '..';
import {Styles} from '../Common/Styles';

export default function ViewActivity({route = [], id = ''}) {
  const focused = useIsFocused();
  const [activity, setActivity] = useState([]);

  const [error, setError] = useState('');

  const getActivity = async () => {
    const {data} = await axios.get(
      'activities/' + (id !== '' ? id : route.params.id),
    );
    if (data.error) {
      setError(data.error);
    } else {
      setActivity(data);
    }
  };

  useEffect(() => {
    if (focused) {
      getActivity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView>
        <ViewNameDesc element={activity} />
        {activity.tags && (
          <ViewStackText
            type="tags"
            title="Related Interests"
            items={activity.tags}
          />
        )}
        {activity.help && (
          <ViewStackText
            type="help"
            title="Help Needed or offered"
            items={activity.help}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
