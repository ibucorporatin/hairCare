import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';
import { useImageUploadContext } from '../../../context/ImageUploadProvider';
import axios from 'axios';

const Loading = ({ openModal }) => {
  const { uploadedImages } = useImageUploadContext();
  const [progress] = useState(new Animated.Value(0));
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    // Make the API call initially when the component mounts
    uploadImagesToMockAPI(uploadedImages);
    
    // Start the progress animation
    Animated.timing(progress, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    
    // Clean up progress listener
    return () => progress.removeAllListeners();
  }, []);

  useEffect(() => {
    // Update progress value
    progress.addListener(({ value }) => {
      setProgressValue(Math.round(value));
    });
  }, []);

  useEffect(() => {
    // Open modal when progress reaches 100%
    if (progressValue === 100) {
      openModal?.();
    }
  }, [progressValue]);

  const uploadImagesToMockAPI = async (uploadedImages) => {
    try {
      const data = uploadedImages.map((data) => ({
        id: data.id,
        name: data.name,
        globalImage: data.globalImage,
        closeupImage: data.closeupImage,
      }));
      const url =
        'https://run.mocky.io/v3/2e4b7ec9-0aa9-4f4f-b6ed-24cae1426f97';
      const response = await axios.post(url, data);
      // Handle response if necessary
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error if necessary
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.bar,
            {
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Image source={require('../../../../assets/images/straiped.png')} />
            <Image source={require('../../../../assets/images/straiped.png')} />
            <Image source={require('../../../../assets/images/straiped.png')} />
          </View>
        </Animated.View>
      </View>
      <Text style={styles.prgressText}>{progressValue}% in progress</Text>
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: colors.lightBlue,
    borderRadius: 20,
  },
  bar: {
    height: 10,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    overflow: 'hidden',
  },
  prgressText: {
    fontSize: 16,
    color: colors.lightBlue,
    fontFamily: fonts.semiBold,
    alignSelf: 'center',
    marginTop: 15,
  },
});
