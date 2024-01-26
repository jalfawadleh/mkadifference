import React from 'react';
import {Button, TextInput, View} from 'react-native';
import {Styles} from '../Common/Styles';
export default function CreateActivity({activity, setActivity, postActivity}) {
  return (
    <>
      <View style={Styles.box}>
        <View style={Styles.rowInput}>
          <TextInput
            style={Styles.rowInputText}
            value={activity.name}
            placeholder="Activity Name"
            onChangeText={text =>
              setActivity(prevState => ({
                ...prevState,
                name: text,
              }))
            }
            placeholderTextColor="#dddddd"
          />
          <Button
            style={Styles.rowInputButton}
            title="+"
            onPress={() => postActivity()}
          />
        </View>
      </View>
    </>
  );
}
