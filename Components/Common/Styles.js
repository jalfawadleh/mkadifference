import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c2f2f',
  },

  error: {
    padding: 5,
    color: 'red',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  header: {
    padding: 5,
    color: '#fff4e6',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  note: {
    padding: 5,
    color: 'yellow',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  placeholderTextColor: '#666666',

  input: {
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 15,
    backgroundColor: '#be9b7b',
    color: 'white',
  },

  box: {
    margin: 5,
    padding: 5,
    borderColor: '#be9b7b',
    borderWidth: 1,
  },
  title: {
    padding: 5,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff4e6',
  },
  textInput: {
    color: '#fff4e6',
    margin: 5,
    padding: 5,
    fontSize: 18,
    backgroundColor: '#be9b7b',
  },
  row: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap-reverse',
  },
  rowButtons: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowInput: {
    margin: 5,
    flexDirection: 'row',
    width: '100%',
  },
  rowInputText: {
    color: '#fff4e6',
    margin: 5,
    padding: 5,
    fontSize: 18,
    backgroundColor: '#be9b7b',
    flexGrow: 1,
  },
  rowInputButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#fff4e6',
    fontSize: 30,
  },
  button: {
    margin: 5,
    fontSize: 20,
    backgroundColor: '#fff4e6',
  },
  tagName: {
    fontSize: 16,
    color: '#fff4e6',
  },
  submit: {
    margin: 5,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#fff4e6',
    borderColor: 'black',
  },

  // home screen
  homeContainer: {
    flex: 1,
    backgroundColor: '#3c2f2f',
    margin: 0,
    padding: 10,
  },
  homeRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  homeCol: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    borderRadius: 45,
  },
  homeLink: {
    alignSelf: 'center',
    margin: 5,
    padding: 5,
  },
  homeLinkIcon: {
    width: 100,
    height: 100,
  },
  homeLinkTitle: {
    fontSize: 30,
    color: '#fff4e6',
    alignSelf: 'center',
    width: '100%',
  },

  // location
  locationPoint: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
