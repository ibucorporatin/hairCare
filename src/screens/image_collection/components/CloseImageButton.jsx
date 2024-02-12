import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../../styles/colors';

const CloseImageButton = ({onCloseButtonPress}) => {
  const activeOpacity = 0.8;
  return (
    <TouchableOpacity
      onPress={onCloseButtonPress}
      activeOpacity={activeOpacity}
      style={styles.closeImageButton}>
      <Image
        style={{width: 10, height: 10}}
        source={require('../../../../assets/images/close.png')}
      />
    </TouchableOpacity>
  );
};

export default CloseImageButton;

const styles = StyleSheet.create({
  closeImageButton: {
    position: 'absolute',
    backgroundColor: colors.secondary,
    width: 30,
    aspectRatio: 1,
    borderRadius: 30 / 2,
    right: '7%',
    top: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
