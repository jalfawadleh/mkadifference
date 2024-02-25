// import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Pressable, Modal, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ViewModal({modalContent}) {
  const [content, setContent] = useState(modalContent);

  useEffect(() => {
    setContent(modalContent);
  }, [modalContent]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={content ? true : false}
      // onRequestClose={() => setModalContent('')}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          {content}
          <Pressable style={styles.button} onPress={() => setContent('')}>
            <Text style={styles.textStyle}>Hide</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // modal
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalView: {
    width: '100%',
    height: '80%',
    top: 25,
    margin: 10,

    alignItems: 'center',

    backgroundColor: '#222222',
    opacity: 0.8,
  },
  button: {
    borderRadius: 15,
    margin: 5,
    padding: 10,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
