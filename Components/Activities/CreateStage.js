import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {Styles} from '../Common/Styles';
export default function CreateStage({activity, setActivity, putActivity}) {
  const [stage, setStage] = useState([]);
  const [stages, setStages] = useState(activity.stages);

  const addStage = async () => {
    stages.push(stage);
    setActivity(prevState => ({...prevState, stages}));
    putActivity(0);
  };

  return (
    <>
      <View style={Styles.box}>
        <View style={Styles.rowInput}>
          <TextInput
            style={Styles.rowInputText}
            value={stage.name}
            placeholder="Stage Name"
            onChangeText={text => setStage({name: text})}
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
