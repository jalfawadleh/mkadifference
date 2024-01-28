import React, {useState} from 'react';
import {Text} from 'react-native';

import {Styles} from '../../Common/Styles';
import CreateStage from './CreateStage';
import ListStages from './ListStages';
// import EditStage from '../EditStage';

export default function Stages({activity, setActivity, putActivity}) {
  const [stage, setStage] = useState([]);
  const delStage = () => {};
  return (
    <>
      <Text style={Styles.title}>Stages</Text>

      <ListStages
        activity={activity}
        setStage={setStage}
        delStage={delStage}
        putActivity={putActivity}
      />

      <CreateStage
        activity={activity}
        setActivity={setActivity}
        putActivity={putActivity}
      />
    </>
  );
}
