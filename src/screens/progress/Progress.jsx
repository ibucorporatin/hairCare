import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../styles/colors';
import Loading from './components/Loading';
import {fonts} from '../../../styles/fonts';

const Progress = () => {
  const activeOpacity = 0.8;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Loading openModal={openModal} />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../../../assets/images/tick.png')} />
            <Text style={styles.successText}>Successful</Text>
            <Text style={styles.successMessageText}>
              Your 4 global images is successfully uploaded.
            </Text>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              style={styles.button}>
              <Text style={styles.buttonText}>Go back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: '12%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  successText: {
    fontFamily: fonts.semiBold,
    color: colors.primary,
    fontSize: 20,
    marginTop: 10,
  },
  successMessageText: {
    fontFamily: fonts.regular,
    color: '#7698A1',
    fontSize: 16,
    marginTop: 10,
   textAlign:"center"
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop:20
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});
