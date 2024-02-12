import React, {useState} from 'react';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../styles/colors';
import Loading from './components/Loading';
import {fonts} from '../../../styles/fonts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useImageUploadContext} from '../../context/ImageUploadProvider';

const Progress = () => {
  // Accessing necessary context, navigation, and route
  const {resetUploadedImages} = useImageUploadContext();
  const navigation = useNavigation();
  const route = useRoute();

  // Destructure parameters from route or set default values
  const {option, count} = route?.params || {};

  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to handle the "Go back to home" button press
  const onBackToHomePress = () => {
    // Reset the uploaded images context
    resetUploadedImages?.();

    // Navigate back to the 'image_collection' screen and reset the navigation stack
    navigation.reset({
      index: 0,
      routes: [{name: 'image_collection'}],
    });
  };

  return (
    <View style={styles.container}>
      {/* Loading component */}
      <Loading openModal={openModal} />

      {/* Modal */}
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Success icon */}
            <Image source={require('../../../assets/images/tick.png')} />

            {/* Success text */}
            <Text style={styles.successText}>Successful</Text>

            {/* Success message */}
            <Text style={styles.successMessageText}>
              {`Your ${count} ${option} images have been successfully uploaded.`}
            </Text>

            {/* "Go back to home" button */}
            <TouchableOpacity
              onPress={onBackToHomePress}
              activeOpacity={0.8}
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});
