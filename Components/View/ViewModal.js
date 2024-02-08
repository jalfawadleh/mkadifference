// import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Pressable, Modal, Text} from 'react-native';
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
          {content ? content : ''}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setContent('')}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',

    borderTopEndRadius: 25,
    borderTopStartRadius: 25,

    backgroundColor: '#222222',
  },

  // modal
  centeredView: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    top: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    opacity: 0.9,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
