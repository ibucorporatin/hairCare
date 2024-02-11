import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../styles/colors';
import {fonts} from '../../../../styles/fonts';

const ImageItem = () => {
  return (
    <LinearGradient
      colors={['#1BD6711D', '#1BD671CC']}
      style={[styles.container]}>
      {/* icon */}
      <Image
        style={styles.icon}
        source={require('../../../../assets/images/white_checked.png')}
      />
      <Image
        style={{width: '100%', height: '100%', zIndex: -1}}
        source={{
          uri: 'https://images.unsplash.com/photo-1682687221363-72518513620e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
        }}
      />
      <Text style={styles.text}>Top</Text>
    </LinearGradient>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    height: '48.9%',
    width: '48.5%',
    alignItems: 'center',
    borderRadius: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    top: '30%',
  },
  text: {
    position: 'absolute',
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.semiBold,
    bottom: '15%',
  },
});
