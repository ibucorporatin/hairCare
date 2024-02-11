import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../styles/colors';
import {fonts} from '../../../styles/fonts';
import HeadPoseItem from './components/HeadPoseItem';
import {useNavigation} from '@react-navigation/native';

const ImageCollection = () => {
  const navigation = useNavigation();
  const activeOpacity = 0.8;
  const [isGlobal, setIsGlobal] = useState(true);
  const onOptionPress = value => {
    setIsGlobal(value);
  };

  const onEndPress = () => {
    navigation.navigate('image_overview');
  };

  return (
    <View style={styles.container}>
      {/* top */}
      <View style={styles.top}>
        <Text style={styles.topText}>Wade Warren</Text>

        <TouchableOpacity
          onPress={onEndPress}
          activeOpacity={activeOpacity}
          style={styles.topButton}>
          <Text style={styles.topButtonText}>End</Text>
        </TouchableOpacity>
      </View>

      {/* camera */}
      <View style={styles.cameraContainer}>
        <Image source={require('../../../assets/images/left.png')} />
        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={styles.cameraButton}></TouchableOpacity>
      </View>

      {/* option */}
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

      {/* HeadPose */}
      <View style={styles.headPoseContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={() => <HeadPoseItem />}
          keyExtractor={(item, index) => index}
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
    backgroundColor: '#838383',
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
    // backgroundColor: colors.lightBlue,
    // marginHorizontal: 20,
    // borderRadius: 25,
    alignItems: 'center',
    position: 'relative',
  },
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
