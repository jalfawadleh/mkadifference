import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from './Header';

export default function Home(probs: {
  user: {username: string; _id: any};
}): React.JSX.Element {
  const [nav, setNav] = useState('');

  return (
    // Main Container
    <View style={styles.container}>
      {/* Header */}
      <Header setNav={setNav} />

      {/* Main */}
      <View style={styles.main}>
        <Text>{nav}</Text>
        <Text>{probs.user.username}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerElement}>Sch</Text>
        <Text style={styles.footerElement} onPress={() => {}}>
          Map
        </Text>
        <Text style={styles.footerElement}>MKaDifference</Text>
        <Text style={styles.footerElement}>Mng</Text>
        <Text style={styles.footerElement}>Msg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    margin: 0,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 0,
    paddingTop: 25,
    backgroundColor: '#3c2f2f',
  },
  headerElement: {
    flex: 1,
    margin: 4,
    height: 40,
    width: 40,
    color: 'white',

    borderColor: '#fff4e6',
    borderWidth: 2,

    // backgroundColor: '#be9b7b',
  },
  headerIcon: {
    height: 30,
    width: 30,
    margin: 4,
  },
  headerLogo: {
    flex: 4,
    padding: 4,
    height: 40,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
  main: {
    flex: 10,
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    backgroundColor: '#be9b7b',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 0,
    padding: 0,
    height: 50,
    backgroundColor: '#3c2f2f',
  },
  footerElement: {
    height: 40,
    fontSize: 25,
    color: 'white',
  },
});
