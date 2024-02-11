import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../styles/colors';
import {fonts} from '../../../../styles/fonts';

const Uploading = ({width}) => {
  return (
    <LinearGradient
      colors={['#4550BA00', '#3A49D4CC']}
      style={[styles.container, {width: width}]}>
      <Image
        style={styles.image}
        source={require('../../../../assets/images/loading.png')}
      />
      <Text style={styles.text}>Uploading</Text>
    </LinearGradient>
  );
};

export default Uploading;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop:"45%"
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.pBold,
    color: colors.white,
  },
});
