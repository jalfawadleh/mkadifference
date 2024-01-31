/**
 * MKaDifference
 * @format
 */
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import axios from 'axios';

import {Home, Login, Activities} from '.';
import Communicate from './Communicate';
import EditActivity from './Activities/EditActivity';
import ViewActivity from './Activities/ViewActivity';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [user, setUser] = useState({
    _id: '',
    username: '',
  });

  axios.defaults.baseURL = 'http://127.0.0.1:3001/api/';
  axios.defaults.headers.common.Authorization = user.token;
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {fontSize: 28, color: '#fff4e6'},
          headerStyle: {
            backgroundColor: '#3c2f2f',
          },
        }}>
        {user._id ? (
          <Stack.Group initialRouteName="Home">
            <Stack.Screen name="Home" options={{headerShown: false}}>
              {props => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Activities"
              options={{headerBackTitleVisible: false}}>
              {props => <Activities {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="EditActivity"
              options={{headerBackTitleVisible: false}}>
              {props => <EditActivity {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ViewActivity" options={{headerBackTitle: ''}}>
              {props => <ViewActivity {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Communicate">
              {props => <Communicate {...props} user={user} />}
            </Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Login"
            options={{
              headerTitle: 'MKaDifference',
              headerTitleStyle: {fontSize: 28, color: '#fff4e6'},
              headerStyle: {
                backgroundColor: '#3c2f2f',
              },
            }}>
            {props => <Login {...props} setUser={setUser} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
