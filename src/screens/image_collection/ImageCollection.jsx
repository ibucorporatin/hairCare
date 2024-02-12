import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {colors} from '../../../styles/colors';
import {fonts} from '../../../styles/fonts';
import HeadPoseItem from './components/HeadPoseItem';
import {useNavigation} from '@react-navigation/native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useImageUploadContext} from '../../context/ImageUploadProvider';
import CloseImageButton from './components/CloseImageButton';
import CaptureImageButton from './components/CaptureImageButton';
import SideIcon from './components/SideIcon';

const ImageCollection = () => {
  // Accessing necessary context and navigation
  const {
    uploadedImages,
    currentPose,
    uploadImage,
    closeupImageCount,
    globalImageCount,
    showCamera,
    setShowCamera,
  } = useImageUploadContext();
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  const activeOpacity = 0.8;
  const [isGlobal, setIsGlobal] = useState(true);

  // Function to handle option press
  const onOptionPress = value => {
    setIsGlobal(value);
  };

  // Function to navigate to image overview screen
  const onEndPress = () => {
    navigation.navigate('image_overview');
  };

  // Camera reference and device
  const camera = useRef(null);
  const device = useCameraDevice('back');

  // Function to handle capture button press
  const onCaptureButtonPress = async () => {
    // Request camera permission
    const permission = await Camera.requestCameraPermission();
    if (permission === 'granted') {
      setShowCamera(true);
      if (camera.current !== null) {
        // Take photo
        const photo = await camera.current.takePhoto();
        const path = `file://${photo.path}`;
        // Upload image
        uploadImage(path, isGlobal);
        setShowCamera(false);
      }
    } else if (permission === 'denied') {
      await Linking.openSettings();
    }
  };

  const flatListRef = useRef(null);

  const globalImageSource = currentPose?.globalImage
    ? {uri: currentPose?.globalImage}
    : null;
  const closeupImageSource = currentPose?.closeupImage
    ? {uri: currentPose?.closeupImage}
    : null;
  const mainImageSource = currentPose?.mainImage;
  const imageSource = isGlobal
    ? globalImageSource || mainImageSource
    : closeupImageSource || mainImageSource;

  const showCloseButton =
    !showCamera &&
    ((isGlobal && currentPose?.globalImage) || currentPose?.closeupImage);

  return (
    <View style={styles.container}>
      {/* Top section */}
      <View style={styles.top}>
        <Text style={styles.topText}>Wade Warren</Text>
        <TouchableOpacity
          disabled={!closeupImageCount && !globalImageCount}
          onPress={onEndPress}
          activeOpacity={activeOpacity}
          style={[
            styles.topButton,
            {
              backgroundColor:
                closeupImageCount || globalImageCount
                  ? colors.secondary
                  : '#838383',
            },
          ]}>
          <Text style={styles.topButtonText}>End</Text>
        </TouchableOpacity>
      </View>

      {/* Camera view */}
      <View style={[styles.cameraContainer, {height: height * 0.58}]}>
        {showCamera ? (
          <Camera
            style={{width: '100%', height: '100%'}}
            ref={camera}
            photo={true}
            device={device}
            isActive={showCamera}
          />
        ) : (
          <Image style={{width: '100%', height: '100%'}} source={imageSource} />
        )}

        {/* Render capture or close button */}
        {showCloseButton ? (
          <CloseImageButton onCloseButtonPress={onCaptureButtonPress} />
        ) : (
          <CaptureImageButton onCaptureButtonPress={onCaptureButtonPress} />
        )}
      </View>

      {/* Option selection */}
      <View style={styles.optionContainer}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={[styles.option, isGlobal ? styles.activeOption : null]}
          onPress={() => onOptionPress(true)}>
          <Text style={styles.optionText}>Global</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={[styles.option, !isGlobal ? styles.activeOption : null]}
          onPress={() => onOptionPress(false)}>
          <Text style={styles.optionText}>Close-Up</Text>
        </TouchableOpacity>
      </View>
      <SideIcon />
      {/* Head pose items */}
      <View style={styles.headPoseContainer}>
        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          data={uploadedImages}
          renderItem={({item}) => <HeadPoseItem item={item} flatListRef={flatListRef} />}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default ImageCollection;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 35,
  },
  topText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  topButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  topButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#515151',
  },

  cameraContainer: {
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 35,
    backgroundColor: colors.lightBlue,
    borderRadius: 25,
    overflow: 'hidden',
  },

  optionContainer: {
    backgroundColor: colors.lightBlue,
    flexDirection: 'row',
    width: '70%',
    borderRadius: 20,
    padding: 2.5,
    alignSelf: 'center',
    marginVertical: 30,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  optionText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  activeOption: {
    backgroundColor: colors.secondary,
  },

  headPoseContainer: {
    flex: 1,
  },
});
