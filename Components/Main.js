/**
 * MKaDifference
 * @format
 */
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import axios from 'axios';

import {
  Home,
  Login,
  Activities,
  Profile,
  Messages,
  Updates,
  EditActivity,
  ViewActivity,
  Search,
  ViewMember,
} from '.';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    location: [],
    darkmood: true,
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
            backgroundColor: '#111111',
          },
        }}>
        {user._id ? (
          <Stack.Group initialRouteName="Home">
            <Stack.Screen name="Home" options={{headerShown: false}}>
              {props => <Home {...props} user={user} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Activities">
              {props => <Activities {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen name="Profile">
              {props => <Profile {...props} user={user} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Messages">
              {props => <Messages {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Updates">
              {props => <Updates {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {props => <Search {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="EditActivity">
              {props => <EditActivity {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ViewActivity">
              {props => <ViewActivity {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ViewMember">
              {props => <ViewMember {...props} />}
            </Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {props => <Login {...props} user={user} setUser={setUser} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
