import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Alert} from 'react-native';
import {colors} from '../../../../styles/colors';
import {fonts} from '../../../../styles/fonts';

const Loading = ({openModal}) => {
  const [progress] = useState(new Animated.Value(0));
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    progress.addListener(({value}) => {
      setProgressValue(Math.round(value));
    });

    return () => progress.removeAllListeners();
  }, []);

  useEffect(() => {
    if (progressValue === 100) {
      openModal?.()
    }
  }, [progressValue]);

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
          ]}></Animated.View>
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
  },
  prgressText: {
    fontSize: 16,
    color: colors.lightBlue,
    fontFamily: fonts.semiBold,
    alignSelf: 'center',
    marginTop: 15,
  },
});
