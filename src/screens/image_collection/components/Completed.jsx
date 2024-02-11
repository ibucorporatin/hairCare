import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Completed = ({width}) => {
  return (
    <LinearGradient
      colors={['#1BD6711D', '#1BD671CC']}
      style={[styles.container, {width: width}]}>
      <Image
        style={styles.image}
        source={require('../../../../assets/images/checked.png')}
      />
    </LinearGradient>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: '45%',
  },
});
