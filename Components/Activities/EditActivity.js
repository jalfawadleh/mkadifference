import React from 'react';
import {Button, TextInput, View} from 'react-native';

import {Styles} from '../Common/Styles';
import Stages from './Stages/Stages';

export default function EditActivity({activity, setActivity, putActivity}) {
  const newActivity = [{_id: 0, name: '', stages: []}];
  return (
    <>
      <View style={Styles.box}>
        <TextInput
          style={Styles.textInput}
          placeholder="Name"
          placeholderTextColor="#aaa4e6"
          onChangeText={text =>
            setActivity(prevState => ({
              ...prevState,
              name: text,
            }))
          }
          value={activity.name}
          editable
          maxLength={50}
        />
        <TextInput
          style={Styles.textInput}
          placeholder="Description"
          placeholderTextColor="#aaa4e6"
          onChangeText={text =>
            setActivity(prevState => ({
              ...prevState,
              description: text,
            }))
          }
          value={activity.description}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
        />

        <Stages
          activity={activity}
          setActivity={setActivity}
          putActivity={putActivity}
        />

        <View style={Styles.rowButtons}>
          <Button
            style={Styles.button}
            title="Update Activity"
            onPress={() => putActivity()}
          />
          <Button
            style={Styles.button}
            title="Cancel"
            onPress={() => setActivity(newActivity)}
          />
        </View>
      </View>
    </>
  );
}
