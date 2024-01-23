// import axios from 'axios';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {MenuItems} from '.';
export default function Manage({user}) {
  const [nav, setNav] = useState('');

  return (
    <>
      <MenuItems
        items={['Projects', 'Events', 'Communities']}
        nav={nav}
        setNav={setNav}
      />

      {nav === 'Projects' && <Text>Projects</Text>}
      {nav === 'Events' && <Text>Events</Text>}
      {nav === 'Communities' && <Text>Communities</Text>}
    </>
  );
}
