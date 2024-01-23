// import axios from 'axios';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {MenuItems} from '.';
export default function Communicate({user}) {
  const [nav, setNav] = useState('');
  const items = ['Updates', 'Messages', 'Contacts', 'Profile'];
  return (
    <>
      <MenuItems items={items} nav={nav} setNav={setNav} />
      {nav === 'Updates' && <Text>profile</Text>}
      {nav === 'Messages' && <Text>Messages</Text>}
      {nav === 'Contacts' && <Text>Contacts</Text>}
      {nav === 'Profile' && <Text>Profile</Text>}
    </>
  );
}
