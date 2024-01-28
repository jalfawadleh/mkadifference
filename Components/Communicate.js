import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from '.';
import Messages from './Messages';
import Updates from './Updates';
import Contacts from './Contacts';

const Tab = createBottomTabNavigator();

export default function Communicate({user}) {
  return (
    <Tab.Navigator initialRouteName="Updates">
      <Tab.Screen name="Updates">
        {props => <Updates {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Messages">
        {props => <Messages {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Contacts">
        {props => <Contacts {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {props => <Profile {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
