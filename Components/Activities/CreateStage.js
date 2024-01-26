import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {Styles} from '../Common/Styles';
export default function CreateStage({activity, setActivity}) {
  const [stage, setStage] = useState([]);
  const [stages, setStages] = useState(activity.stages);

  const addStage = () => {
    setStage(prevState => ({...prevState, name: stages.length}));
    setStages(prevState => ({...prevState, stage}));
    setActivity(prevState => ({...prevState, stages}));
  };
  return (
    <>
      <View style={Styles.box}>
        <View style={Styles.rowInput}>
          <TextInput
            style={Styles.rowInputText}
            value={stage.name}
            placeholder="Stage Name"
            onChangeText={text =>
              setStage(prevState => ({...prevState, name: text}))
            }
            placeholderTextColor={Styles.placeholderTextColor}
          />
          <Button
            style={Styles.rowInputButton}
            title="+"
            onPress={() => addStage()}
          />
        </View>
      </View>
    </>
  );
}
