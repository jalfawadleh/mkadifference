import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  error: {
    padding: 5,
    color: 'red',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  note: {
    padding: 5,
    color: 'yellow',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  box: {
    backgroundColor: '#3c2f2f',
    margin: 5,
    padding: 5,
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
    flexWrap: 'wrap',
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
});
