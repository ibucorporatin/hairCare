import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../../styles/colors';

const CaptureImageButton = ({onCaptureButtonPress}) => {
  const activeOpacity = 0.8;
  return (
    <TouchableOpacity
      onPress={onCaptureButtonPress}
      activeOpacity={activeOpacity}
      style={styles.cameraButton}
    />
  );
};

export default CaptureImageButton;

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    backgroundColor: colors.secondary,
    width: 56,
    aspectRatio: 1,
    borderRadius: 56 / 2,
    bottom: '6%',
    borderWidth: 5,
    borderColor: colors.secondary + 50,
  },
});
