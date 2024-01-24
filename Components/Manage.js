// import axios from 'axios';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {MenuItems} from '.';
export default function Manage({user}) {
  const [nav, setNav] = useState('');
  const items = [
    {id: 20, name: 'Projects'},
    {id: 21, name: 'Events'},
    {id: 22, name: 'Communities'},
  ];
  return (
    <>
      <MenuItems items={items} nav={nav} setNav={setNav} />

      {nav === 'Projects' && <Text>Projects</Text>}
      {nav === 'Events' && <Text>Events</Text>}
      {nav === 'Communities' && <Text>Communities</Text>}
    </>
  );
}
