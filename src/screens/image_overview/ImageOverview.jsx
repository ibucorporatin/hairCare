import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../styles/colors';
import {fonts} from '../../../styles/fonts';
import ImageItem from './components/ImageItem';
import {useNavigation} from '@react-navigation/native';

const ImageOverview = () => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const activeOpacity = 0.8;
  const [isGlobal, setIsGlobal] = useState(true);
  const onOptionPress = value => {
    setIsGlobal(value);
  };

  const onUpload = () => {
    navigation.navigate('progress');
  };

  return (
    <View style={styles.container}>
      <View>
        {/* top text */}
        <Text style={styles.topText}>3 Global images</Text>

        {/* images */}
        <View
          style={[
            styles.imageContainer,
            {width: width - 70, height: height * 0.47},
          ]}>
          <ImageItem />
          <ImageItem />
          <ImageItem />
          <ImageItem />
        </View>

        {/* option */}
        <View style={styles.optionContainer}>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            style={[styles.option, isGlobal ? styles.activeOption : null]}
            onPress={() => onOptionPress(true)}>
            <Text style={styles.optionText}>Global(3)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            style={[styles.option, !isGlobal ? styles.activeOption : null]}
            onPress={() => onOptionPress(false)}>
            <Text style={styles.optionText}>Close Up(3)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* upload */}
      <TouchableOpacity
        onPress={onUpload}
        activeOpacity={activeOpacity}
        style={styles.uploadButton}>
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
    backgroundColor: colors.secondary,
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
