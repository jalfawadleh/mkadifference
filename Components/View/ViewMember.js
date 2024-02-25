import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {ViewStackText, ViewNameDesc} from '..';
import {Styles} from '../Common/Styles';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

export default function ViewMember({route = [], id = ''}) {
  const focused = useIsFocused();
  const [error, setError] = useState('');

  const [member, setMember] = useState([]);

  const getMember = async () => {
    const {data} = await axios.get(
      'members/' + (id !== '' ? id : route.params.id),
    );
    if (data.error) {
      setError(data.error);
    } else {
      setMember(data);
    }
  };

  useEffect(() => {
    if (focused) {
      getMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView>
        <ViewNameDesc element={member} />
        {member.tags && (
          <ViewStackText
            type="tags"
            title="Related Interests"
            items={member.tags}
          />
        )}
        {member.help && (
          <ViewStackText
            type="help"
            title="Help Needed or offered"
            items={member.help}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
