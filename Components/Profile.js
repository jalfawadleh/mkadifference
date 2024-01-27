import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import axios from 'axios';

import {Styles} from './Common/Styles';
import StackText from './Common/StackText';

export default function Profile({user}) {
  const [member, setMember] = useState([{description: ''}]);

  const getMember = async () => {
    const {data} = await axios.get('members/' + user._id);
    setMember(data);
  };

  const putMember = async () => {
    const {data} = await axios.put('members/' + member._id, member);
    setMember(data);
  };

  useEffect(() => {
    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  return (
    <>
      <View style={Styles.box}>
        <Text style={Styles.title}>About Me</Text>
        <TextInput
          onChangeText={text =>
            setMember(prevState => ({
              ...prevState,
              description: text,
            }))
          }
          value={member.description}
          editable
          multiline
          numberOfLines={4}
          maxLength={200}
          style={Styles.textInput}
        />
      </View>
      <StackText
        type="tags"
        title="Interests"
        items={member.tags}
        setItem={setMember}
      />
      <StackText
        type="help"
        title="Help offered or needed"
        items={member.help}
        setItem={setMember}
      />
      <View style={Styles.submit}>
        <Button title="Update" onPress={() => putMember()} />
      </View>
    </>
  );
}
