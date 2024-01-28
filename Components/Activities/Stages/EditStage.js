import React from 'react';
import {Button, TextInput, View} from 'react-native';

import {Styles} from '../../Common/Styles';

export default function EditStage({stage, setStage}) {
  return (
    <>
      <View style={Styles.box}>
        <TextInput
          style={Styles.textInput}
          placeholder="Name"
          placeholderTextColor="#aaa4e6"
          onChangeText={text =>
            setStage(prevState => ({
              ...prevState,
              name: text,
            }))
          }
          value={stage.name}
          editable
          maxLength={50}
        />
        <TextInput
          style={Styles.textInput}
          placeholder="Description"
          placeholderTextColor="#aaa4e6"
          onChangeText={text =>
            setStage(prevState => ({
              ...prevState,
              description: text,
            }))
          }
          value={stage.description}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
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
            onPress={() => setStage([{name: ''}])}
          />
        </View>
      </View>
    </>
  );
}
