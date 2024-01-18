/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView} from 'react-native';
import LoginForm from './Components/LoginForm';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <LoginForm />
    </SafeAreaView>
  );
}
