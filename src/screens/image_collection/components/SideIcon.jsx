import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const SideIcon = () => {
  // Define the active opacity for the TouchableOpacity
  const activeOpacity = 0.8;

  // Define the expanded state
  const [expanded, setExpanded] = useState(false);

  // Function to toggle the expanded state
  const onToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <LinearGradient
      colors={[expanded ? colors.secondary : 'transparent', 'transparent']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[
        styles.container,
        {alignItems: expanded ? 'flex-start' : 'flex-end'},
      ]}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onToggle}
        style={styles.button}>
        {/* Image for the side icon */}
        <Image
          style={styles.icon}
          source={require('../../../../assets/images/chat_bot.png')}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 46 * 2,
    borderRadius: 46 / 2,
    bottom: '16%',
    right: '-6%',
    zIndex: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.secondary,
    borderRadius: 30,
  },
  icon: {
    margin: 7,
  },
});

export default SideIcon;
