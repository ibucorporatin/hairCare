import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {fonts} from '../../../../styles/fonts';
import {colors} from '../../../../styles/colors';
import Uploading from './Uploading';
import Completed from './Completed';

const HeadPoseItem = () => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[styles.container, {width: width * 0.29}]}
      activeOpacity={0.8}>
      {/* <Image
        style={{width:width * 0.29, height:"100%"}}
        source={{
          uri: '',
        }}
      /> */}
      <Image
        style={{marginTop: '20%'}}
        source={require('../../../../assets/images/small_top.png')}
      />
      <Text style={styles.text}>Top</Text>

      {/* <Uploading width={width * 0.29} /> */}
      {/* <Completed width={width * 0.29} /> */}
    </TouchableOpacity>
  );
};

export default HeadPoseItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A3033',
    alignItems: 'center',
    position: 'relative',
    zIndex: -1,
  },
  text: {
    position: 'absolute',
    fontSize: 14,
    color: colors.lightBlue,
    fontFamily: fonts.regular,
    bottom: '15%',
    zIndex: 2,
  },
});
