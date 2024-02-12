import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {colors} from '../../../styles/colors';
import {fonts} from '../../../styles/fonts';
import ImageItem from './components/ImageItem';
import {useNavigation} from '@react-navigation/native';
import {useImageUploadContext} from '../../context/ImageUploadProvider';

const ImageOverview = () => {
  // Accessing necessary context and navigation
  const {uploadedImages, closeupImageCount, globalImageCount} =
    useImageUploadContext();
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();

  // State to manage whether global or close-up images are being viewed
  const [isGlobal, setIsGlobal] = useState(true);

  // Function to handle option press
  const onOptionPress = value => {
    setIsGlobal(value);
  };

  // Function to navigate to progress screen
  const onUpload = () => {
    navigation.navigate('progress', {
      option: isGlobal ? 'global' : 'close up',
      count: isGlobal ? globalImageCount : closeupImageCount,
    });
  };

  // Determine if upload button should be disabled
  const disabled = isGlobal ? globalImageCount == 0 : closeupImageCount == 0;

  return (
    <View style={styles.container}>
      <View>
        {/* Display top text */}
        <Text style={styles.topText}>{`${
          isGlobal ? globalImageCount : closeupImageCount
        } ${isGlobal ? 'Global' : 'Close Up'} images`}</Text>

        {/* Display images */}
        <View
          style={[
            styles.imageContainer,
            {width: width - 70, height: height * 0.47},
          ]}>
          {uploadedImages
            .filter(item => (isGlobal ? item.globalImage : item.closeupImage))
            .map(item => {
              return <ImageItem key={item.id} item={item} />;
            })}
        </View>

        {/* Option buttons */}
        <View style={styles.optionContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.option, isGlobal ? styles.activeOption : null]}
            onPress={() => onOptionPress(true)}>
            <Text
              style={styles.optionText}>{`Global(${globalImageCount})`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.option, !isGlobal ? styles.activeOption : null]}
            onPress={() => onOptionPress(false)}>
            <Text
              style={
                styles.optionText
              }>{`Close Up(${closeupImageCount})`}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload button */}
      <TouchableOpacity
        disabled={disabled}
        onPress={onUpload}
        activeOpacity={0.8}
        style={[
          styles.uploadButton,
          {
            backgroundColor: disabled
              ? colors.secondary + 50
              : colors.secondary,
          },
        ]}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 35,
    paddingVertical: 35,
    justifyContent: 'space-between',
  },
  topText: {
    color: colors.lightBlue,
    fontSize: 16,
    fontFamily: fonts.semiBold,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  optionContainer: {
    backgroundColor: colors.lightBlue,
    flexDirection: 'row',
    width: '80%',
    borderRadius: 20,
    padding: 2.5,
    alignSelf: 'center',
    marginVertical: 25,
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
  uploadButton: {
    alignItems: 'center',
    borderRadius: 6,
  },
  uploadButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.semiBold,
    paddingVertical: 15,
  },
});
