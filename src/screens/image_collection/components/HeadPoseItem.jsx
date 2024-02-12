import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {fonts} from '../../../../styles/fonts';
import {colors} from '../../../../styles/colors';
import Uploading from './Uploading';
import Completed from './Completed';
import {useImageUploadContext} from '../../../context/ImageUploadProvider';

const HeadPoseItem = ({item, flatListRef}) => {
  // Accessing necessary context and window dimensions
  const {updateCurrentPose, currentPose} = useImageUploadContext();
  const {width} = useWindowDimensions();

  // Function to handle tab press
  const onTabPress = () => {
    updateCurrentPose(item?.id); // Update the current pose in context
    item.id == 1 && scrollToStart();
    item.id == 4 && scrollToEnd();
  };

  // Check if an image is uploaded
  const isImageUploaded = item.globalImage || item.closeupImage;

  // Determine image style and source based on whether an image is uploaded
  const imageStyle = isImageUploaded
    ? {width: '100%', height: '100%'}
    : {marginTop: '20%'};
  const imageSource = isImageUploaded
    ? {uri: item.globalImage || item.closeupImage}
    : item.smallImage;

  // Define styles for tab container and text
  const tabContainer = [
    styles.container,
    {
      width: width * 0.29,
      backgroundColor: item?.isFocus ? colors.primary : '#1A3033',
      borderTopRightRadius: currentPose.id - 1 == item.id ? 20 : 0,
      borderTopLeftRadius: currentPose.id + 1 == item.id ? 20 : 0,
    },
  ];
  const textStyle = [
    styles.text,
    {
      color: item?.isFocus ? colors.white : colors.lightBlue,
      fontFamily: item?.isFocus ? fonts.pBold : fonts.regular,
    },
  ];

  // Function to scroll to the start of the list
  const scrollToStart = () => {
    flatListRef.current.scrollToIndex({index: 0});
  };

  // Function to scroll to the end of the list
  const scrollToEnd = () => {
    const lastIndex = 3;
    flatListRef.current.scrollToIndex({index: lastIndex});
  };
  return (
    <TouchableOpacity
      disabled={item?.isFocus}
      onPress={onTabPress}
      style={tabContainer}
      activeOpacity={0.8}>
      {/* Image component displaying the head pose */}
      <Image style={imageStyle} source={imageSource} />

      {/* Text displaying the name of the head pose */}
      <Text style={textStyle}>{item?.name}</Text>

      {/* Conditional rendering of Uploading or Completed components */}
      {isImageUploaded &&
        (item?.isLoading ? (
          <Uploading width={width * 0.29} />
        ) : (
          <Completed width={width * 0.29} />
        ))}
    </TouchableOpacity>
  );
};

export default HeadPoseItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
    zIndex: -1,
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    fontSize: 14,
    bottom: '15%',
    zIndex: 2,
  },
});
