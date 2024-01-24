import React, {useState} from 'react';
import {Text} from 'react-native';

import {MenuItems} from '.';

import Profile from './Communicate/Profile';

export default function Communicate({user}) {
  const [nav, setNav] = useState('');
  const items = [
    {id: 30, name: 'Updates'},
    {id: 31, name: 'Messages'},
    {id: 32, name: 'Contacts'},
    {id: 33, name: 'Profile'},
  ];
  return (
    <>
      <MenuItems items={items} nav={nav} setNav={setNav} />
      {nav === 'Updates' && <Text>Updates</Text>}
      {nav === 'Messages' && <Text>Messages</Text>}
      {nav === 'Contacts' && <Text>Contacts</Text>}
      {nav === 'Profile' && <Profile user={user} />}
    </>
  );
}
