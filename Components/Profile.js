import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import axios from 'axios';

import {Styles} from './Common/Styles';
import {EditHidden, EditDarkmood, EditLocation, EditStackText} from '.';

export default function Profile({navigation, user, setUser}) {
  const [member, setMember] = useState([{description: ''}]);

  const getMember = async () => {
    const {data} = await axios.get('members/' + user._id);
    setMember(data);
  };

  const putMember = async () => {
    const {data} = await axios.put('members/' + member._id, member);
    setMember(data);
  };

  const updateMember = () => {
    const darkmood = member.darkmood;
    putMember();
    setUser(prevState => ({...prevState, darkmood}));
    navigation.navigate('Home');
  };

  useEffect(() => {
    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  return (
    <>
      <SafeAreaView style={Styles.container}>
        <ScrollView>
          <View style={Styles.box}>
            <Text style={Styles.title}>About Me</Text>
            <TextInput
              onChangeText={text =>
                setMember(prevState => ({...prevState, description: text}))
              }
              value={member.description}
              editable
              multiline
              numberOfLines={4}
              maxLength={200}
              style={Styles.textInput}
            />
          </View>
          <EditStackText
            type="languages"
            title="Languages"
            items={member.languages}
            setItem={setMember}
          />
          <EditStackText
            type="tags"
            title="Interests"
            items={member.tags}
            setItem={setMember}
          />
          <EditStackText
            type="help"
            title="Help offered or needed"
            items={member.help}
            setItem={setMember}
          />
          <EditDarkmood element={member} setElement={setMember} />
          <EditHidden element={member} setElement={setMember} />
          <EditLocation loc={member.location} setElement={setMember} />
        </ScrollView>
        <View style={Styles.rowButtons}>
          <Button title="Update" onPress={() => updateMember()} />
          <Button title="Back" onPress={() => navigation.navigate('Home')} />
        </View>
      </SafeAreaView>
    </>
  );
}
